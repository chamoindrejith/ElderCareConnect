const express = require("express");
const router = express.Router();
const {register} = require('../controllers/userController.js');
const {login} = require('../controllers/userController.js');
const {updateUser}=require('../controllers/userController.js')

router.post('/register',register);
router.post('/login',login);
router.put('/updateUser/:userId',updateUser);



module.exports = router;