const express = require("express");
const router = express.Router();
const { registerUser, loginUser, logoutUser, getUser, loginStatus, updateUser, changePassword, resetPassword, forgetPassword,
    changePhoto
} = require("../Controllers/userContoller");
const protect = require("../middleWare/authMiddleware");
const {upload} = require("../utils/uploadFile");


router.post("/register/", registerUser);
router.post("/login/", loginUser);
router.get("/logout/", logoutUser);
router.get("/getUser/", protect,  getUser);
router.get("/loginStatus/", loginStatus);
router.patch("/updateUser/", protect, updateUser);
router.patch("/changePassword/", protect, changePassword);
router.post("/forgetPassword", forgetPassword);
router.put("/resetPassword/:resetToken", resetPassword);
router.post("/changePhoto", protect, upload.single('image'), changePhoto);
module.exports = router;