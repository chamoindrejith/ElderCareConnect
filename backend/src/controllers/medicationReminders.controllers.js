const MedicationReminder = require('../models/medicationReminder.js');
const User = require('../models/User.js');

// const hasPermission = async (userId, reminder) => {
//       if (reminder.createdBy === userId) return true;

//       const user = await User.findOne({ NIC: userId });  // Query using NIC instead of _id
//       if (!user) return false;

//       return user.relationships.some((relatedNIC) => relatedNIC === reminder.createdBy);

// };

const hasPermission = async (userNIC, reminder) => {
  console.log('Reminder Created By:', reminder.createdBy);
  console.log('User NIC:', userNIC);

  if (reminder.createdBy === userNIC) {
      console.log('Permission granted: User is the creator');
      return true;
  }

  const user = await User.findOne({ NIC: userNIC });
  console.log('User:', user);

  if (!user) {
      console.log('No user found for NIC');
      return false;
  }

  console.log('User Relationships:', user.relationships);
  const isRelated = user.relationships.some((relatedNIC) => relatedNIC === reminder.createdBy);
  console.log('Permission granted by relationship:', isRelated);
  return isRelated;
};


exports.createReminder = async (req, res) => {
    try {
      const { title, details, reminderTime } = req.body;
      const reminder = new MedicationReminder({
        title,
        details,
        reminderTime,
        //createdBy: req.user._id,
        createdBy: req.user.NIC,
        updatedBy: req.user._id
      });
      await reminder.save();
      res.status(201).json(reminder);
    } catch (error) {
      res.status(500).json({ message: 'Error creating reminder', error });
    }
  };

  exports.getReminders = async (req, res) => {
    try {

      const user = await User.findById(req.user._id);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      const relatedNICs = [user.NIC, ...(user.relationships || [])];
      const relatedUsers = await User.find({ NIC: { $in: relatedNICs } }).select('_id');

      const relatedUserIds = relatedUsers.map((relatedUser) => relatedUser._id);

      const reminders = await MedicationReminder.find({
        createdBy: { $in: relatedUserIds },
      });
      if (!reminders) {
        return res.status(404).json({ message: 'Reminder not found' });
      }
      res.status(200).json(reminders);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching reminders', error });
    }
  };

  // exports.updateReminder = async (req, res) => {
  //   try {
  //     const { id } = req.params;
  //     const { title, details, reminderTime } = req.body;

  //     const reminder = await MedicationReminder.findById(id);
  //   if (!reminder) {
  //     return res.status(404).json({ message: 'Reminder not found' });
  //   }
      
  //   if (!(await hasPermission(req.user.NIC, reminder))) {
  //     return res.status(403).json({ message: 'You do not have permission to update this reminder' });
  //   }
      
  //   reminder.title = title;
  //   reminder.details = details;
  //   reminder.reminderTime = reminderTime;
  //   reminder.updatedBy = req.user._id;  
  //   reminder.updatedAt = Date.now();

  //   await reminder.save();

  //     res.status(200).json(reminder);
  //   } catch (error) {
  //     res.status(500).json({ message: 'Error updating reminder', error });
  //   }
  // };


  exports.updateReminder = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, details, reminderTime } = req.body;

        
        const reminder = await MedicationReminder.findById(id);
        if (!reminder) {
            return res.status(404).json({ message: 'Reminder not found' });
        }

       
        const requestingUser = await User.findOne({ NIC: req.user.NIC });
        if (!requestingUser) {
            return res.status(404).json({ message: 'Requesting user not found' });
        }

        const creatorUser = await User.findOne({ NIC: reminder.createdBy });
        if (!creatorUser) {
            return res.status(404).json({ message: 'Creator of the reminder not found' });
        }

    
        const isPermitted =
            reminder.createdBy === requestingUser.NIC || 
            (requestingUser.role === 'elderly' && creatorUser.role === 'caregiver' && requestingUser.relationships.includes(reminder.createdBy)) ||
            (requestingUser.role === 'caregiver' && creatorUser.role === 'elderly' && creatorUser.relationships.includes(requestingUser.NIC));

        if (!isPermitted) {
            return res.status(403).json({ message: 'You do not have permission to update this reminder' });
        }

        reminder.title = title;
        reminder.details = details;
        reminder.reminderTime = reminderTime;
        reminder.updatedBy = req.user._id;
        reminder.updatedAt = Date.now();

        await reminder.save();

        res.status(200).json(reminder);
    } catch (error) {
        console.error('Error updating reminder:', error);
        res.status(500).json({ message: 'Error updating reminder', error });
    }
};





  // exports.deleteReminder = async (req, res) => {
  //   try {
  //     const { id } = req.params;
  //     await MedicationReminder.findByIdAndDelete(id);
  //     if (!reminder) {
  //       return res.status(404).json({ message: 'Reminder not found' });
  //     }

  //     if (reminder.createdBy.toString() !== req.user._id.toString()) {
  //       return res.status(403).json({ message: 'You do not have permission to delete this reminder' });
  //     }
  
  //     await reminder.deleteOne();
      
  //     res.status(200).json({ message: 'Reminder deleted successfully' });
  //   } catch (error) {
  //     res.status(500).json({ message: 'Error deleting reminder', error });
  //   }
  // };

  
exports.deleteReminder = async (req, res) => {
    try {
        const { id } = req.params;

       
        const reminder = await MedicationReminder.findById(id);
        if (!reminder) {
            return res.status(404).json({ message: 'Reminder not found' });
        }

        if (reminder.createdBy !== req.user.NIC) {
            return res.status(403).json({ message: 'You do not have permission to delete this reminder' });
        }

      
        await reminder.deleteOne();

        res.status(200).json({ message: 'Reminder deleted successfully' });
    } catch (error) {
        console.error('Error deleting reminder:', error);
        res.status(500).json({ message: 'Error deleting reminder', error: error.message || error });
    }
};
