const User=require("../models/User");
const UserSettings=require("../models/UserSettings");
const bcrypt =require("bcrypt")

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
        res.status(500).json({ message: "Error creating user!" ,error: error.message });
    }
}

module.exports = { register };