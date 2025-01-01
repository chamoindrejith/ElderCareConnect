const express = require('express');
const router = express.Router();
const  emergencyContactController  = require('../controllers/emergencyContact.controller.js');
const { authenticateToken } = require('../middleware/auth.middleware'); // Middleware for authentication

// CRUD Endpoints for Emergency Contacts
router.get('/', emergencyContactController.getEmergencyContacts); // Get all contacts 
router.get('/call',authenticateToken,emergencyContactController.getEmergencyContactsAndMakeCall);


module.exports = router;
