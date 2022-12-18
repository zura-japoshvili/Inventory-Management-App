const AsyncHandler = require("express-async-handler");
const User = require("../Models/userModel");
const jwt = require("jsonwebtoken");


const protect = AsyncHandler(async (req, res, next) => {
    try {
        const token = req.cookie.token;
        if (!token){
             res.status(401);
             throw new Error("Not authorized, please try to login in");
        }

        // Verifying token
        const verify = jwt.verify(token, process.env.JWT_SECRET);

        const user = await User.findById(verify.id).select("-password");

        if (!user){
            res.status(401);
            throw new Error("User not found");
        }

        req.user = user;
        next();
    }catch (e) {
        res.status(401);
        throw new Error("Not authorized, please try to login in");
    }
});

module.exports = protect;