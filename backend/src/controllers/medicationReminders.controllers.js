const MedicationReminder = require('../models/medicationReminder.js');
const User = require('../models/User.js');

const hasPermission = async (userId, reminder) => {
      if (reminder.createdBy === userId) return true;

      const user = await User.findOne({ NIC: userId });  // Query using NIC instead of _id
      if (!user) return false;

      return user.relationships.some((relatedNIC) => relatedNIC === reminder.createdBy);

};

exports.createReminder = async (req, res) => {
    try {
      const { title, details, reminderTime } = req.body;
      const reminder = new MedicationReminder({
        title,
        details,
        reminderTime,
        createdBy: req.user._id,
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

  exports.updateReminder = async (req, res) => {
    try {
      const { id } = req.params;
      const { title, details, reminderTime } = req.body;

      const reminder = await MedicationReminder.findById(id);
    if (!reminder) {
      return res.status(404).json({ message: 'Reminder not found' });
    }
      
    if (!(await hasPermission(req.user.NIC, reminder))) {
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
      res.status(500).json({ message: 'Error updating reminder', error });
    }
  };



  exports.deleteReminder = async (req, res) => {
    try {
      const { id } = req.params;
      await MedicationReminder.findByIdAndDelete(id);
      if (!reminder) {
        return res.status(404).json({ message: 'Reminder not found' });
      }

      if (reminder.createdBy.toString() !== req.user._id.toString()) {
        return res.status(403).json({ message: 'You do not have permission to delete this reminder' });
      }
  
      await reminder.deleteOne();
      
      res.status(200).json({ message: 'Reminder deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error deleting reminder', error });
    }
  };