const chatSocket = (io) => {
    io.on('connection', (socket) => { // Jab koi user connect hota hai
        console.log('A user connected', socket.id);

        socket.on('joinRoom', (room) => { // Jab user kisi specific room me join hota hai
            socket.join(room); // User ko us room me add kar diya jata hai
            console.log(`User joined room: ${room}`);
        });

        socket.on('sendMessage', (data) => { // Jab user message bhejta hai ()
            io.to(data.chatRoom).emit('message', data); // Ye message us room ke sab users tak pohcha diya jata hai
        });

        socket.on('disconnect', () => { // Jab user disconnect hota hai
            console.log('User disconnected');
        });
    });

};

module.exports = chatSocket;

// sendMessage ChatRoom.js file ke sendMessage function se aaya means 
/* Sending Messages: Jab user apna message type kar ke "send" button press karta hai, to sendMessage
 function backend ko wo message send kar deta hai. Backend phir us message ko sab users tak broadcast
 kar deta hai jo us chat room me hain. */