const MedicationReminder = require('../models/medicationReminder.js');


exports.createReminder = async (req, res) => {
    try {
      const { title, details } = req.body;
      const reminder = new MedicationReminder({
        title,
        details,
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
      res.status(200).json(reminders);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching reminders', error });
    }
  };

  exports.updateReminder = async (req, res) => {
    try {
      const { id } = req.params;
      const { title, details } = req.body;
      const reminder = await MedicationReminder.findByIdAndUpdate(
        id,
        { title, details, updatedBy: req.user.role, updatedAt: Date.now() },
        { new: true }
      );
      res.status(200).json(reminder);
    } catch (error) {
      res.status(500).json({ message: 'Error updating reminder', error });
    }
  };
