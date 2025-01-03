const Message = require('../backend/src/models/chat');
const MedicationReminder = require('../backend/src/models/medicationReminder');

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

      io.to(receiverId).emit('locationReceived', {
        senderId,
        location,
      });
    });

    socket.on('disconnect', () => {
      console.log("User disconnected:", socket.id);

    });
  });
};

module.exports = (io) => {
  io.on('connection', (socket) => {
    console.log("User connected:", socket.id);

    // Medication reminder notifications
    socket.on('getReminder', async (userId) => {
      const reminders = await MedicationReminder.find({ userId: userId, reminderTime: { $lte: new Date() } });

      reminders.forEach((reminder) => {
          const message = `Reminder: ${reminder.title}. ${reminder.message}`;
          socket.emit('notification', message); // Send reminder to user
      });
  });

          // Handle request to get reminders for a specific user
          socket.on('getReminder', async (userId) => {
            const currentTime = new Date();

            // Fetch reminders for the user where the reminderTime is due and not sent yet
            const reminders = await MedicationReminder.find({
                createdBy: userId,
                reminderTime: { $lte: currentTime.toISOString().slice(11, 16) }, // Check if reminderTime is due
                isSent: false // Only pick reminders that haven't been sent yet
            });

            reminders.forEach(async (reminder) => {
                const message = `Reminder: ${reminder.title} - ${reminder.details}`;

                // Send the notification to the user
                socket.emit('notification', message);

                // Mark the reminder as sent
                reminder.isSent = true;
                await reminder.save(); // Save the updated status
            });
        });

        // Emit reminder to specific user
        const emitReminder = (userId, reminder) => {
            if (io) {
                io.to(userId).emit('notification', reminder); // Send reminder to specific user
            }
        };

        // Periodically check for reminders to be sent
        const checkMedicationReminders = async () => {
            setInterval(async () => {
                const currentTime = new Date().toISOString().slice(11, 16); // Get current time in HH:mm format

                const reminders = await MedicationReminder.find({
                    reminderTime: { $lte: currentTime }, // Check if reminderTime is due
                    isSent: false // Only fetch unsent reminders
                });

                reminders.forEach(async (reminder) => {
                    // Emit reminder notification
                    const message = `Reminder: ${reminder.title} - ${reminder.details}`;
                    io.emit('notification', message); // Broadcast to all connected clients

                    // Mark the reminder as sent
                    reminder.isSent = true;
                    await reminder.save(); // Save the updated status
                });
            }, 60000); // Run this every minute (60000ms)
        };

      // Start checking reminders as soon as the socket connection is established
      checkMedicationReminders();
    socket.on('disconnect', () => {
      console.log("User disconnected:", socket.id);

    });
  });
};
