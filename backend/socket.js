const Message = require('../backend/src/models/chat');

module.exports = (io) => {
    io.on('connection', (socket) => {
        console.log('New client connected:', socket.id);
    
}