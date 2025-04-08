const jwt = require('jsonwebtoken');
const User = require('../models/User');

const authenticateToken = async (req, res, next) => {
    const token = req.header('Authorization')?.split(' ')[1];

    if (!token) {
      return res.status(401).json({ message: 'Access Denied. No token provided.' });
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      const user = await User.findById(decoded.userId);
        if (!user) {
          return res.status(404).json({ message: 'User not found.' });
        }

        req.user = {
          _id: user._id,
          NIC: user.NIC,
          role: user.role,
        };
        next(); 
    
    }catch(error){
      return res.status(403).json({ message: 'Invalid or expired token.' });
    }
};

module.exports = { authenticateToken };