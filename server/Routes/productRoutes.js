const express = require('express');
const router = express.Router();
const protect = require("../middleWare/authMiddleware");
const {createProduct} = require("../Controllers/productController");
const {upload} = require("../utils/uploadFile");



router.post("/newProduct", upload.single('image') , createProduct);





module.exports = router;