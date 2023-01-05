const express = require('express');
const router = express.Router();
const protect = require("../middleWare/authMiddleware");
const {createProduct, getProducts, deleteProduct} = require("../Controllers/productController");
const {upload} = require("../utils/uploadFile");



router.post("/newProduct", protect,upload.single('image') , createProduct);
router.get('/getProducts/:userId', protect ,getProducts);
router.delete("/delete/:productId/:userId", protect, deleteProduct);




module.exports = router;