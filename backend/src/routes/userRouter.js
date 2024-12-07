const express = require('express');
const router = express.Router();
const { 
    register, 
    login, 
    updateUser, 
    deleteUser, 
    getUserProfile, 
    getContacts 
} = require('../controllers/userController'); 
const { authenticateToken } = require('../middleware/auth.middleware');

router.post('/register', register);

router.post('/login', login);

router.get('/profile/:userId', authenticateToken, getUserProfile);

router.get('/contacts/:userId', authenticateToken, getContacts);

router.put('/update/:userId', authenticateToken, updateUser);

router.delete('/delete/:userId', authenticateToken, deleteUser);

module.exports = router;
