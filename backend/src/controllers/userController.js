const User=require("../models/User");
const bcrypt =require("bcrypt")
const jwt = require("jsonwebtoken");
require('dotenv').config();

//user reegistration
 async function register(req,res){
    const{ username, password,email,dateOfBirth,contactInfo,address, role}=req.body;
    const saltRound=10;


try{
    const existinguser = await User.findOne({email});
    if(existinguser){
        return res.status(400).json({ message: 'User already exists' });
    }

    const passwordHash = bcrypt.hashSync(password,saltRound);

    const newUser = new User({
        username,
        password:passwordHash,
        email,
        dateOfBirth,
        contactInfo,
        address,
        role

    })
    
    await newUser.save()
    console.log("Received data:",req.body);

          res.status(201).json({ message: "User created successfully!" });
    }catch(error)  {
        res.status(500).json({ message: "Error creating user!" ,error: error.message});
    }
}

//user login
async function login(req, res) {
    const { username, password } = req.body;

    try {
        // Validate input
        if (!username || !password) {
            return res.status(400).json({ message: "username and password are required" });
        }

        // Find user by username
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Compare passwords
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        // Generate a token
        const token = jwt.sign(
            { userId: user._id, role: user.role },
            process.env.JWT_SECRET || "your_jwt_secret", // Use environment variable
            { expiresIn: "1h" }
        );

        // Respond with token and user details
        res.status(200).json({
            message: "Login successful",
            token,
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                role: user.role,
            },
        });
    } catch (error) {
        console.error("Login error:", error.message);
        res.status(500).json({ message: "Error logging in!", error: error.message });
    }
}

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
