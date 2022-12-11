const AsyncHandler = require("express-async-handler");
const User = require("../Models/userModel");

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
        password
    });

    if (newUser) {
        res.status(201).json(newUser);
    }else{
        res.status(400);
        throw new Error("Invalid user data");
    }
})

module.exports = {
    registerUser,
}