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