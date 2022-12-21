const express = require("express");
const router = express.Router();
const { registerUser, loginUser, logoutUser, getUser, loginStatus, updateUser, changePassword, resetPassword, forgetPassword} = require("../Controllers/userContoller");
const protect = require("../middleWare/authMiddleware");

router.post("/register/", registerUser);
router.post("/login/", loginUser);
router.get("/logout/", logoutUser);
router.get("/getUser/", protect,  getUser);
router.get("/loginStatus/", loginStatus);
router.patch("/updateUser/", protect, updateUser);
router.patch("/changePassword/", protect, changePassword);
router.post("/forgetPassword", forgetPassword);
router.put("/resetPassword/:resetToken", resetPassword);
module.exports = router;