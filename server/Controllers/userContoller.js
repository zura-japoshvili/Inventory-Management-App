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
// User logout func
const logoutUser = AsyncHandler( async (req, res) => {
    res.cookie("token", "", {
        path: "/",
        httpOnly: true,
        expires: new Date(0),
        sameSite: "none",
        secure: true
    })

    return res.status(200).json({message: "Successfully logged out"});
})

const getUser = AsyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);
    if (user){
        const {_id, name, email, photo, bio, phone } = user;

        res.status(201).json({
            _id,
            name,
            email,
            photo,
            bio,
            phone,
            token
        });
    }else{
        res.status(400);
        throw new Error("User not found");
    }
})

const loginStatus = AsyncHandler( async (req, res) => {
    const token = req.cookies.token;
    if(!token) {
        return res.json(false);
    }

    const verify = jwt.verify(token, process.env.JWT_SECRET);
    if (verify){
        return res.json(true);
    }

    return res.json(false);
})

const updateUser = AsyncHandler( async (req, res) => {
    const user = await User.findById(req.user._id);
    if (user){
        const {name, email, photo, bio, phone } = user;
            user.name = req.body.user || name;
            user.email = email;
            user.photo = req.body.photo || photo;
            user.bio = req.body.bio || bio;
            user.phone = req.body.photo || phone;

        const updateUser = await user.save();

        res.status(200).json({
            _id: updateUser._id,
            name: updateUser.name,
            email: updateUser.email,
            photo: updateUser.photo,
            bio: updateUser.bio,
            phone: updateUser.phone,
        });
    }else{
        res.status(404);
        throw new Error("User not found");
    }
})
module.exports = {
    registerUser,
    loginUser,
    logoutUser,
    getUser,
    loginStatus,
    updateUser
}