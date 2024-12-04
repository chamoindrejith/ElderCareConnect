const express = require("express");
const {register} = require('../controllers/userController.js');

const userRouter = express.Router();

userRouter.post('/register',register);

export default userRouter;