const mongoose = require('mongoose');
const bcrypt = require("bcryptjs");

const userSchema = mongoose.Schema({
    name: {
        type: String,
        require: [true, "Name is required !"]
    },
    email: {
        type: String,
        require: [true, "Email is required !"],
        unique: true,
        trim: true,
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            "Please enter a valid email address"
        ]
    },
    password: {
        type: String,
        require: [true, "Password is required !"],
        minLength: [8, "Password length shouldn't be a less then 8 letters"]
    },
    photo: {
        type: String,
        require: [true, "Photo is required !"],
        default: "https://cdn.icon-icons.com/icons2/1378/PNG/512/avatardefault_92824.png"
    },
    phone: {
        type: String,
        default: '+995'
    },
    bio: {
        type: String,
        maxLength: [250, "Bio shouldn't be a higher then 250 letters"],
        default: "bio is empty"
    }
},
    {
        timestamps: true
    })

userSchema.pre("save", async function(next)  {

    if (!this.isModified("password")){
        return next();
    }

    // hash password before we save data in database
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(this.password, salt);

    this.password = hashedPass;

})

const User = mongoose.model("User", userSchema);
module.exports = User;