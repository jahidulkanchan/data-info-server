const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const http = require('http'); // Required to use socket.io
const { Server } = require('socket.io');
const connectDB = require('./config/db');

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// MongoDB Connect
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// HTTP server তৈরি করো
const server = http.createServer(app);

// Socket.io instance তৈরি করো
const io = new Server(server, {
  cors: {
    origin: '*', // production এ specific origin দাও
    methods: ['GET', 'POST'],
  },
});

// Clients connect হলে console এ দেখাও
io.on('connection', (socket) => {
  console.log('User connected:', socket.id);
});

// Global ভাবে io export করো
module.exports.io = io;

// Routes
const userRoutes = require('./user/user.routes');
app.use('/api/users', userRoutes);

// Test route
app.get('/', (req, res) => {
  res.send('This Catch Server is Running');
});

// Server listen
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
