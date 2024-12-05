const Message = require('../models/chat.js');

exports.getChatHistory = async (req, res) => {
    try {
      const { senderId, receiverId } = req.params;
      const messages = await Message.find({
        $or: [
          { sender: senderId, receiver: receiverId },
          { sender: receiverId, receiver: senderId }
        ]
      }).sort({ createdAt: 1 }); 
      res.status(200).json(messages);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching chat history', error });
    }
  };

exports.saveMessage = async (req, res) => {
    try {
      const { senderId, receiverId, text } = req.body;
      const message = new Message({
        sender: senderId,
        receiver: receiverId,
        text
      });
      await message.save();
  
      res.status(201).json({ message: 'Message sent successfully', data: message });
    } catch (error) {
      res.status(500).json({ message: 'Error sending message', error });
    }
  };


  let io; 

  exports.initSocket = (socketIo) => {
    io = socketIo; 
  };

  exports.shareLocation = async (req, res) => {
    try {
      const { senderId, receiverId, location } = req.body;
      
      console.log(`Location shared by ${senderId} to ${receiverId}:`, location);
  
      if (io) {
        console.log(`Emitting location to receiver ID: ${receiverId}`);
        io.to(receiverId).emit('locationShared', {
          senderId,
          location,
        });
      } else {
        console.error("Socket.IO instance is not initialized.");
      }
      
    } catch (error) {
      
    }
  };
  