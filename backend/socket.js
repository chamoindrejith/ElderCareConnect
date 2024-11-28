const Message = require('../backend/src/models/chat');

module.exports = (io) => {
    io.on('connection', (socket) => {
        console.log('New client connected:', socket.id);
    
        socket.on('joinRoom', ({ senderId, receiverId }) => {
            const room = `${senderId}-${receiverId}`;
            socket.join(room);
            console.log(`User ${senderId} joined room ${room}`);
          });
};