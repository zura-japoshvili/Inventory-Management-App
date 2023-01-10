const AsyncHandler = require("express-async-handler");
const Product = require('../Models/productModel');
const {fileSizeFormatter} = require("../utils/uploadFile");
const cloudinary = require('../utils/uploadFile');

const createProduct = AsyncHandler(async (req, res) => {
    const {id, name, sku, description, category, quantity, price} = req.body;

    if(!name || !description || !category || !quantity || !price){
        res.status(400);
        throw new Error("Please fill in all fields");
    }

    if (req.file){

        fileData = {
            fileName: req.file.originalname,
            filePath: req.file.path,
            fileType: req.file.mimetype,
            fileSize: fileSizeFormatter(req.file.size, 2),
        };

        // Create Product
        const product = await Product.create({
            user: id,
            name,
            sku,
            category,
            quantity,
            price,
            description,
            image: fileData,
        });

        res.status(201).json(product);
    }else{
        res.status(500);
        throw new Error("Image could not be uploaded");
    }
})

// getting all products which owner is current user
const getProducts = AsyncHandler(async  (req, res) => {
    const {userId} = req.params;
   if (userId){
       const products = await Product.find({user: userId}).sort('createdAt');
       res.status(200).json(products);
   }else{
       res.status(403)
       throw new Error("Please authenticate");
   }

})

const deleteProduct = AsyncHandler(async (req, res) => {
    const {productId, userId} = req.params

    const product = await Product.findById(productId);
    if (!product){
        res.stutus(404)
        throw new Error("Current product doesn't exists !");
    }
    if (product.user.toString() !== userId) {
        res.status(401);
        throw new Error("User not authorized");
    }

    await product.remove();
    res.status(200).json({message: "Product is successfully deleted"});


})

module.exports = {
    createProduct,
    getProducts,
    deleteProduct
}