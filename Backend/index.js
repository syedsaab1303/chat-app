const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const http = require('http');
const { Server } = require('socket.io');
const dotenv = require("dotenv");

// 👇 ye sabse pehle load hona chahiye
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// CORS Configuration
const corsOptions = {
    origin: 'http://localhost:3000', // React frontend URL
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // Allow cookies to be sent and received
    optionsSuccessStatus: 200
};

app.use(cors(corsOptions)); // Apply CORS middleware

// Middleware
app.use(bodyParser.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

// Basic Route
app.get('/', (req, res) => {
    res.send('Welcome to ChatterBox API');
});

// Import and use routes
const authRoutes = require('./routes/auth');
const chatRoutes = require('./routes/chat');
app.use('/auth', authRoutes);
app.use('/chat', chatRoutes);

// Socket.IO Setup
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST'],
    },
});

// Integrate Socket.IO with chatSocket
const chatSocket = require('./sockets/chatSocket');
chatSocket(io);

// Start Server
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
