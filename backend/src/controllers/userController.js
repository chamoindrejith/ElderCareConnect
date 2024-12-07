// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
// const User = require('../models/User');
// require('dotenv').config();

// exports.registerUser = async (req, res) => {
//   try {
//     const { username, password, role, NIC, dateOfBirth, address, email, phone, relationships } = req.body;

//     // Check if the user already exists
//     const existingUser = await User.findOne({ $or: [{ username }, { NIC }, { email }] });
//     if (existingUser) {
//       return res.status(400).json({ message: 'Username, NIC, or Email already taken' });
//     }

//     // Create and save the new user
//     const newUser = new User({ username, password, role, NIC, dateOfBirth, address, email, phone, relationships });
//     await newUser.save();

//     res.status(201).json({ message: 'User registered successfully' });
//   } catch (error) {
//     res.status(500).json({ message: 'Error registering user', error: error.message });
//   }
// };


// // Login a user
// exports.loginUser = async (req, res) => {
//   try {
//     const { username, password } = req.body;

//     // Find the user by username
//     const user = await User.findOne({ username });
//     if (!user) {
//       return res.status(400).json({ message: 'Invalid credentials' });
//     }

//     // Check if the provided password is correct
//     const isPasswordValid = await bcrypt.compare(password, user.password);
//     if (!isPasswordValid) {
//       return res.status(400).json({ message: 'Invalid credentials' });
//     }

//     // Generate a JWT token
//     const token = jwt.sign(
//       { userId: user._id, role: user.role },
//       process.env.JWT_SECRET,
//       { expiresIn: '1h' }
//     );

//     res.json({ message: 'Login successful', token });
//   } catch (error) {
//     res.status(500).json({ message: 'Error logging in', error });
//   }
// };

// Fetch contacts based on user role
exports.getContacts = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    let contacts;
    if (user.role === 'elderly') {
      // Elderly users can chat with caregivers
      contacts = await User.find({ role: 'caregiver' });
    } else if (user.role === 'caregiver') {
      // Caregivers can chat with elderly users
      contacts = await User.find({ role: 'elderly' });
    }

    res.status(200).json(contacts);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching contacts', error });
  }
};


exports.getUserProfile = async (req, res) => {
  try {
    const { userId } = req.params;

    // Find the user
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    // Fetch related users based on NICs
    const relatedUsers = await User.find({ NIC: { $in: user.relationships } });

    res.status(200).json({
      userDetails: {
        username: user.username,
        role: user.role,
        email: user.email,
        phone: user.phone,
        dateOfBirth:user.dateOfBirth,
        address: user.address
      },
      relationships: relatedUsers.map(({ username, role, email, phone, dateOfBirth, address}) => ({
        username,
        role,
        email,
        phone,
        dateOfBirth,
        address
      })),
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching user profile', error: error.message });
  }
};

//update user
async function updateUser(req, res) {
    const { userId } = req.params; // Assume user ID is passed as a URL parameter
    console.log(req.params);
    const { username, password, email, dateOfBirth, contactInfo, address, role } = req.body;

    try {
        // Validate the userId is a valid ObjectId
        if (!userId.match(/^[0-9a-fA-F]{24}$/)) {
            return res.status(400).json({ message: "Invalid User ID format" });
        }

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Update fields if provided in the request
        if (username) user.username = username;
        if (email) user.email = email;
        if (dateOfBirth) user.dateOfBirth = dateOfBirth;
        if (contactInfo) user.contactInfo = contactInfo;
        if (address) user.address = address;
        if (role) user.role = role;

        // Update password if provided
        if (password) {
            const saltRound = 10;
            user.password = await bcrypt.hash(password, saltRound);
        }

        await user.save();

        res.status(200).json({
            message: "User updated successfully!",
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                role: user.role,
            },
        });
    } catch (error) {
        res.status(500).json({ message: "Error updating user!", error: error.message });
    }
}

// Delete user
async function deleteUser(req, res) {
    const { userId } = req.params; // Assume user ID is passed as a URL parameter

    try {
        // Validate the userId is a valid ObjectId
        if (!userId || !userId.match(/^[0-9a-fA-F]{24}$/)) {
            return res.status(400).json({ message: "Invalid User ID format" });
        }

        // Find and delete the user
        const user = await User.findByIdAndDelete(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({
            message: "User deleted successfully!",
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                role: user.role,
            },
        });
    } catch (error) {
        console.error("Delete error:", error.message);
        res.status(500).json({ message: "Error deleting user!", error: error.message });
    }
}

module.exports = { register, login,updateUser,deleteUser};
