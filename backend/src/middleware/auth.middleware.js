const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.authenticateToken = async (req, res, next) => {
    const token = req.header('Authorization')?.split(' ')[1];
};