const User=require("../models/User");
//const UserSettings=require("../models/UserSettings");
const bcrypt =require("bcrypt")
const jwt = require("jsonwebtoken");


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

module.exports = { register, login };
