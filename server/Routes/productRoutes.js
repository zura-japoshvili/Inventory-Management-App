const express = require('express');
const router = express.Router();
const protect = require("../middleWare/authMiddleware");
const {createProduct, getProducts} = require("../Controllers/productController");
const {upload} = require("../utils/uploadFile");



router.post("/newProduct", upload.single('image') , createProduct);
router.get('/getProducts/:userId', getProducts);




module.exports = router;