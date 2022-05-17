import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Meta from '../components/Meta'
import Chat from '../components/Chat'
import socketIOClient from 'socket.io-client';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClose, faComments } from '@fortawesome/free-solid-svg-icons'
import ScrollToBottom from 'react-scroll-to-bottom';

const ENDPOINT =
    window.location.host.indexOf('localhost') >= 0
        ? 'http://127.0.0.1:4000'
        : window.location.host;
let socket;

const ChatScreen = () => {
    const [name, setName] = useState('');
    const room = `Let's Talk`
    const [users, setUsers] = useState('');
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);

    const userSignin = useSelector((state) => state.userSignin)
    const { userInfo } = userSignin

    useEffect(() => {
        socket = socketIOClient(ENDPOINT);

        const username = userInfo.name
        setName(username)

        if (name) {
            socket.emit('join', { name, room }, (error) => {
                if (error) {
                    alert(error);
                }
            });
        }
    }, [name])

    useEffect(() => {
        socket.on('message', message => {
            setMessages(messages => [...messages, message]);
        });

        socket.on("roomData", ({ users }) => {
            setUsers(users);
        });
    }, [name]);

    const sendMessage = (event) => {
        event.preventDefault();

        if (message) {
            socket.emit('sendMessage', message, () => setMessage(''));
        }
    }

    return (
        <div className="outerContainer">
            <Meta title={'Blog List'} />
            <div className="mainContainer">
                <div className="infoBar">
                    <div className="leftInnerContainer">
                        <FontAwesomeIcon icon={faComments} className="text-info" />
                        <h3>&nbsp; {room}</h3>
                    </div>
                    <div className="rightInnerContainer">
                        <a href="/"><FontAwesomeIcon icon={faClose} className="text-info" /></a>
                    </div>
                </div>

                <ScrollToBottom className="messages">
                    {messages.map((message, i) =>
                        <div key={i}>
                            <Chat message={message} name={name} />
                        </div>)}
                </ScrollToBottom>

                <form className="chatform">
                    <input
                        className="chatinput"
                        type="text"
                        placeholder="Type a message..."
                        value={message}
                        onChange={({ target: { value } }) => setMessage(value)}
                        onKeyPress={event => event.key === 'Enter' ? sendMessage(event) : null}
                    />
                    <button className="sendButton" onClick={e => sendMessage(e)}>Send</button>
                </form>
            </div>

            <div className="textContainer">
                <div>
                    <h1>Realtime Chat Application <span role="img" aria-label="emoji">💬</span></h1>
                    <h2>Let's Talk<span role="img" aria-label="emoji">❤️</span></h2>
                    <h2>Try it out right now! <span role="img" aria-label="emoji">⬅️</span></h2>
                </div>
                {
                    users
                        ? (
                            <div>
                                <h2>People currently chatting:</h2>
                                <div className="activeContainer">
                                    <h2>
                                        {users.map(({ name }) => (
                                            <div key={name} className="activeItem">
                                                {name}&nbsp;
                                                <FontAwesomeIcon icon={faComments} className="text-info" />
                                            </div>
                                        ))}
                                    </h2>
                                </div>
                            </div>
                        )
                        : null
                }
            </div>
        </div>
    );
}

export default ChatScreen;
