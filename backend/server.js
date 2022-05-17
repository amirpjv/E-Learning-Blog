import http from 'http';
import { Server } from 'socket.io';
import express from 'express'
import mongoose from 'mongoose'
import userRouter from './routers/userRouter.js'
import blogRouter from './routers/blogRouter.js'
import uploadRouter from './routers/uploadRouter.js'
import dotenv from 'dotenv'
import path from 'path'
import cors from 'cors'
import bcrypt from 'bcryptjs';
import User from './models/userModel.js'
import { addUser, removeUser, getUser, getUsersInRoom } from './users.js';

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

app.use('/api/uploads', uploadRouter)
app.use('/api/users', userRouter)
app.use('/api/blogs', blogRouter)

const __dirname = path.resolve()
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));
dotenv.config({ path: path.join(__dirname, '.env') });

app.use((err, req, res, next) => {
    return res.status(500).send({ message: err.message })
})

const adminCheck = async () => {
    const isAdmin = await User.find({ isAdmin: true })
    if (isAdmin <= 0) {
        const password = await bcrypt.hash(process.env.ADMIN_PASSWORD, 10)
        const user = new User({
            name: process.env.ADMIN_USERNAME,
            email: process.env.ADMIN_EMAIL,
            password,
            isAdmin: true,
        })
        user.save()
        return console.log('Admin Created');
    }
}

const PORT = process.env.PORT
const URI = process.env.MONGO_URI

const httpServer = http.Server(app);
const io = new Server(httpServer, { cors: { origin: '*' } });

io.on('connect', (socket) => {
    socket.on('join', ({ name, room }, callback) => {
        const { error, user } = addUser({ id: socket.id, name, room });

        if (error) return callback(error);

        socket.join(user.room);

        socket.emit('message', { user: 'Admin', text: `${user.name}, welcome to room ${user.room}.` });
        socket.broadcast.to(user.room).emit('message', { user: 'Admin', text: `${user.name} has joined!` });

        io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room) });

        callback();
    });

    socket.on('sendMessage', (message, callback) => {
        const user = getUser(socket.id);

        io.to(user.room).emit('message', { user: user.name, text: message });

        callback();
    });

    socket.on('disconnect', () => {
        const user = removeUser(socket.id);

        if (user) {
            io.to(user.room).emit('message', { user: 'Admin', text: `${user.name} has left.` });
            io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room) });
        }
    })
});

mongoose.connect(URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
})
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    adminCheck(),
        httpServer.listen(PORT,
            console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
        )
});