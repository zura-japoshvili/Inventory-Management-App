const AsyncHandler = require("express-async-handler");
const User = require("../Models/userModel");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv").config();
const bcrypt = require("bcryptjs");

const generateToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {expiresIn: "1d"});
}

// Register User
const registerUser = AsyncHandler( async (req, res) => {
    const {name, email, password} = req.body;

    if(!name || !email || !password){
        res.status(400);
        throw new Error("Please fill in all required fields");
    }

    const userExists = await User.findOne({email});
    if (userExists) {
        res.status(400);
        throw new Error("This email address already exists");
    }

    // Create New User
    const newUser = await User.create({
        name,
        email,
        password,
    });

    // Generate web token
    const token = generateToken(newUser._id);

    // Send HTTP-only cookie
    res.cookie("token", token, {
        path: "/",
        httpOnly: true,
        expires: new Date(Date.now() + 1000 * 86400), // expires in 1 day
        sameSite: "none",
        secure: true
    })

    if (newUser) {
        const {_id, name, email, password, photo, bio, phone } = newUser;
        res.status(201).json({
            _id,
            name,
            email,
            password,
            photo,
            bio,
            phone,
            token
        });
    }else{
        res.status(400);
        throw new Error("Invalid user data");
    }
})

// Login User

const loginUser = AsyncHandler( async (req, res) => {
    const {email, password} = req.body;
    if (!email || !password){
        res.status(400);
        throw new Error("Please fill in both fields");
    }

    const user = await User.findOne({email});
    if (!user){
        res.status(404)
        throw new Error("User doesn't exists, please enter valid user !");
    }

    // now the user is found, then we check if the password is correct
    const checkPassword = await bcrypt.compare(password, user.password);

    if (user && checkPassword) {
        const {_id, name, email, password, photo, bio, phone } = newUser;
        res.status(200).json({
            _id,
            name,
            email,
            password,
            photo,
            bio,
            phone,
            token
        });
    }else{
        res.status(404);
        throw new Error("email or password is invalid");
    }

})

module.exports = {
    registerUser,
    loginUser
}