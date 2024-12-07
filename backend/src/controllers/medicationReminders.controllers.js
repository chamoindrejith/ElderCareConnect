const MedicationReminder = require('../models/medicationReminder.js');
const User = require('../models/User.js');

const hasPermission = async (userId, reminder) => {
      if (reminder.createdBy === userId) return true;

      const user = await User.findOne({ NIC: userId });  // Query using NIC instead of _id
      if (!user) return false;

}
exports.createReminder = async (req, res) => {
    try {
      const { title, details, reminderTime } = req.body;
      const reminder = new MedicationReminder({
        title,
        details,
        reminderTime,
        createdBy: req.user.role,
        updatedBy: req.user.role
      });
      await reminder.save();
      res.status(201).json(reminder);
    } catch (error) {
      res.status(500).json({ message: 'Error creating reminder', error });
    }
  };

  exports.getReminders = async (req, res) => {
    try {
      const reminders = await MedicationReminder.find();
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
      const reminder = await MedicationReminder.findByIdAndUpdate(
        id,
        { title, details, reminderTime, updatedBy: req.user.role, updatedAt: Date.now() },
        { new: true }
      );
      if (!reminder) {
        return res.status(404).json({ message: 'Reminder not found' });
      }
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
      res.status(200).json({ message: 'Reminder deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error deleting reminder', error });
    }
  };