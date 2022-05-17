const users = [];

export const addUser = ({ id, name, room }) => {
    name = name.trim().toLowerCase();
    room = room.trim().toLowerCase();

    if (!name || !room) return { error: 'Username and room are required.' };

    const user = { id, name, room };

    users.push(user);

    return { user };
}

export const removeUser = (id) => {
    const index = users.findIndex((user) => user.id === id);

    if (index !== -1) return users.splice(index, 1)[0];
}

export const getUser = (id) => users.find((user) => user.id === id);

export const getUsersInRoom = (room) => users.filter((user) => user.room === room);

