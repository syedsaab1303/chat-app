// Working code 
import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import io from 'socket.io-client';
import './ChatRoom.css'; // Import the CSS
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';


let socket;

const ChatRoom = () => {
    const { user } = useAuth(); // User ki information ko AuthContext se le rahe hain
    const [message, setMessage] = useState(''); // Current message jo type kiya ja raha hai.
    const [messages, setMessages] = useState([]); // Pichle messages ka list
    const chatRoom = 'general';

    useEffect(() => {
        socket = io('http://localhost:5000');  // Socket server se connection create kar rahe hain
        socket.emit('joinRoom', chatRoom);

        socket.on('message', (message) => { // Jab koi message receive hota hai
            setMessages((prevMessages) => [...prevMessages, message]); // Us message ko messages list me add kar rahe hain 
        });

        return () => {
            socket.disconnect();
        };
    }, [chatRoom]);

    const sendMessage = (e) => {
        e.preventDefault();
        if (message.trim()) {
            const messageData = {
                sender: user.username,
                content: message,
                chatRoom,
            };
            socket.emit('sendMessage', messageData); // Message server ko send kar rahe hain
            setMessage('');
        }
    };

    return (
        <div className="chat-container">
            <div className="messages">
                {messages.map((msg, idx) => (
                    <div
                        key={idx}
                        className={`message ${msg.sender === user.username ? 'sender' : 'receiver'}`}
                    >
                        <strong>{msg.sender}</strong>: {msg.content}
                    </div>
                ))}
            </div>
            <form onSubmit={sendMessage} style={{ display: 'flex', alignItems: 'center' }}>
                <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type a message..."
                />
                <button type="submit">
                    <FontAwesomeIcon icon={faPaperPlane} />
                </button>

            </form>
        </div>
    );
};

export default ChatRoom;


/* Sending Messages: Jab user apna message type kar ke "send" button press karta hai, to sendMessage
 function backend ko wo message send kar deta hai. Backend phir us message ko sab users tak broadcast
 kar deta hai jo us chat room me hain. */

/* Receiving Messages: Jab backend se koi message aata hai, to socket.on('message') event us message ko
catch karta hai aur state me add kar deta hai taake wo chat window me dikh sake. */
