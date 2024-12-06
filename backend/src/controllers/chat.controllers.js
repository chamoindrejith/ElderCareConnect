const Message = require('../models/chat.js');
const MedicationReminder = require('../models/medicationReminder.js')
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
      res.status(200).json({ message: "Location shared successfully!" });
    } catch (error) {
      console.error("Error sharing location:", error);
      res.status(500).json({ message: "Failed to share location.", error });
    }
  };
  

  exports.shareReminders = async (req, res) => {
    try {
      const { senderId, receiverId, reminderIds } = req.body;

      const reminders = await MedicationReminder.find({
        _id: { $in: reminderIds },
      });
  
      if (reminders.length === 0) {
        return res.status(404).json({ message: 'No valid reminders found to share' });
      }
  
      const reminderText = reminders
      .map(
        (reminder) =>
          `Title: ${reminder.title}\nDetails: ${reminder.details}\nTime: ${reminder.reminderTime}`
      )
      .join('\n\n');

      const message = new Message({
        sender: senderId,
        receiver: receiverId,
        text: `Shared Medication Reminders:\n\n${reminderText}`, // Include reminders in text
      });
  
      await message.save();

      res.status(201).json({
        message: 'Reminders shared successfully',
        data: message,
      });
      
    } catch (error) {
      console.error('Error Sharing Remiders : ', error);
      res.status(500).json({ message: 'Error sharing reminders', error });
    }
  };
  