const express = require('express');
const router = express.Router();
const  emergencyContactContoller  = require('../controllers/emergencyContact.controller.js');

router.post('/',  emergencyContactContoller.createContact);         // Create a contact

module.exports = router;
