const AsyncHandler = require("express-async-handler");
const User = require("../Models/userModel");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv").config();
const bcrypt = require("bcryptjs");
const Token = require("../Models/tokenModel");
const crypto = require("crypto");
const sendEmail = require("../utils/sendEmail");


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

    // Generate web tokenws
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

    //   Generate Token
    const token = generateToken(user._id);

    // Send HTTP-only cookie
    res.cookie("token", token, {
        path: "/",
        httpOnly: true,
        expires: new Date(Date.now() + 1000 * 86400), // 1 day
        sameSite: "none",
        secure: true,
    });

    if (user && checkPassword) {
        const {_id, name, email, password, photo, bio, phone } = user;
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
        });
    }else{
        res.status(400);
        throw new Error("User not found");
    }
})

const loginStatus = AsyncHandler( async (req, res) => {
    const token  = req.cookies.token;
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
});

const changePassword = AsyncHandler( async (req, res) => {
    const user = await User.findById(req.user._id);

    const {oldPassword, newPassword} = req.body;
    if (!user){
        res.status(401)
        throw new Error("User not found, please login in or sign up");
    }

    if(oldPassword || newPassword){
        res.status(400);
        throw new Error("Please fill in both fields");
    }

    // Verifying the password if it matches the old password
    const verifyPass = await bcrypt.compare(oldPassword, user.password);

    // If everything is fine, then we replace the old one with the new one or not and throw the corresponding error
    if (user && verifyPass){
        user.password = newPassword;
        await user.save();
        res.status(200).send("Password is successfully changed");
    }else{
        res.status(400);
        throw new Error("Password doesn't match ! ");
    }
})

const forgetPassword = AsyncHandler(async (req, res) => {
    const {email} = req.body;
    console.log(email)
    console.log(req.body)
    const user = await User.findOne({email});

    if (!user){
        res.status(404);
        throw new Error("This email doesn't exist in our database");
    }

    // CREATE RESET TOKEN
    let resetToken = crypto.randomBytes(32).toString("hex") + user._id;
    // hash token before we save into DB
    const hashedToken = crypto.createHash("sha256").update(resetToken).digest("hex");

    await new Token({
        userId: user._id,
        token: hashedToken,
        createdAt: Date.now(),
        expiresAt: Date.now() + 30 * (60 * 1000) // Expires in 30 minutes
    }).save();

    // Construct Reset URL
    const resetURl = `${process.env.FRONTEND_URl}/auth/resetPassword/${resetToken}`;

    // Reset Email
    const message = `
      <h2>Hello ${user.name}</h2>
      <p>Please use the url below to reset your password</p>  
      <p>This reset link is valid for only 30minutes.</p>
      <a href=${resetURl} clicktracking=off>${resetURl}</a>
      <p>Regards...</p>
      <p>Zura</p>
    `;

    const subject = "Password Reset Request";
    const send_to = user.email;
    const sent_from = process.env.EMAIL_USER;

    try{
        await sendEmail(subject, message, send_to, sent_from);
        res.status(200).json({success: true, message: "A password reset link has been sent to your email, please check it."});

    }catch (e) {
        res.status(500);
        throw new Error("Email not sent, please try again");
    }
})

const resetPassword = AsyncHandler(async (req, res) => {
    const {password} = req.body;
    const {resetToken} = req.params;

    console.log(1312312)
    const hashedToken = crypto.createHash("sha256").update(resetToken).digest("hex");

    const userToken = await Token.findOne({
        token: hashedToken,
        expiresAt: { $gt: Date.now()}
    });

    if (!userToken){
        console.log(123)
        res.status(404);
        throw new Error("Invalid or expired token");
    }

    // if Token is valid, then we're searching a user data
    const user = await User.findOne({_id: userToken.userId});
    user.password = password
    await user.save();
    res.status(200).json({
        message: "password change successfully, please login in again"
    })
})


module.exports = {
    registerUser,
    loginUser,
    logoutUser,
    getUser,
    loginStatus,
    updateUser,
    changePassword,
    forgetPassword,
    resetPassword
}