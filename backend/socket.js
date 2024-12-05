const Message = require('../backend/src/models/chat');

module.exports = (io) => {
    io.on('connection', (socket) => {
        console.log('New client connected:', socket.id);
    
        socket.on('joinRoom', ({ senderId, receiverId }) => {
            const room = `${senderId}-${receiverId}`;
            socket.join(room);
            console.log(`User ${senderId} joined room ${room}`);
          });

          socket.on('sendMessage', async (data) => {
            const { senderId, receiverId, text } = data;
            try {
              const message = new Message({
                sender: senderId,
                receiver: receiverId,
                text
              });
              await message.save();
      
              const room = `${senderId}-${receiverId}`;
              io.to(room).emit('receiveMessage', message);
            } catch (error) {
              console.error('Error saving message:', error);
            }
          });
      
          socket.on('disconnect', () => {
            console.log('Client disconnected:', socket.id);
          });
        });
};


module.exports = (io) => {
  io.on('connection', (socket) => {
    console.log("User connected:", socket.id);

    
    socket.on('shareLocation', (data) => {
      const { senderId, receiverId, location } = data;

    });
  });
};
