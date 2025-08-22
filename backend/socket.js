// backend/socket.js (replace your current file with this)
const socketIo = require('socket.io');
const userModel = require('./models/user_model');
const captainModel = require('./models/captain_model');

let io;

function initializeSocket(server) {
  const allowedOrigins = [
    "https://uber-sigma-nine.vercel.app", // your Vercel project (seen in logs)
    "https://uber-flt7prdoy-vaibhav-aroras-projects-3cd4dc08.vercel.app", // other domain you mentioned
    "http://localhost:5173",
  ];

  io = socketIo(server, {
    cors: {
      origin: (origin, callback) => {
        // log for debugging
        console.log('Socket CORS check, origin:', origin);
        // allow requests with no origin (eg curl / server-to-server)
        if (!origin) return callback(null, true);

        // allow exact origins or any vercel.app preview domain (optional)
        if (
          allowedOrigins.includes(origin) ||
          origin.endsWith('.vercel.app')
        ) {
          return callback(null, true);
        }

        // otherwise reject
        return callback(new Error('CORS not allowed by Socket.IO'), false);
      },
      methods: ['GET', 'POST'],
      credentials: true, // required if client uses withCredentials
      allowedHeaders: ['Content-Type', 'Authorization']
    }
  });

  io.on('connection', (socket) => {
    console.log(`Client connected: ${socket.id}`);

    socket.on('join', async (data) => {
      const { userId, userType } = data;
      try {
        if (userType === 'user') {
          await userModel.findByIdAndUpdate(userId, { socketId: socket.id });
        } else if (userType === 'captain') {
          await captainModel.findByIdAndUpdate(userId, { socketId: socket.id });
        }
      } catch (err) {
        console.error('join handler error:', err);
      }
    });

    socket.on('update-location-captain', async (data) => {
      const { userId, location } = data;
      if (!location || !location.ltd || !location.lng) {
        return socket.emit('error', { message: 'Invalid location data' });
      }
      try {
        await captainModel.findByIdAndUpdate(userId, {
          location: { ltd: location.ltd, lng: location.lng }
        });
      } catch (err) {
        console.error('update-location-captain error:', err);
      }
    });
  });
}

const sendMessageToSocketId = (socketId, messageObject) => {
  console.log('sendMessageToSocketId:', messageObject);

  if (io) {
    io.to(socketId).emit(messageObject.event, messageObject.data);
  } else {
    console.log('Socket.io not initialized.');
  }
};

module.exports = { initializeSocket, sendMessageToSocketId };
