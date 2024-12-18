const express = require('express');
const router = express.Router();
const  emergencyContactContoller  = require('../controllers/emergencyContact.controller.js');

router.post('/',  emergencyContactContoller.createContact);         // Create a contact
router.get('/', emergencyContactContoller.getContacts);  
router.get('/:id', emergencyContactContoller.getContactById);


module.exports = router;
