const AsyncHandler = require("express-async-handler");
const Product = require('../Models/productModel');
const {fileSizeFormatter} = require("../utils/uploadFile");
const cloudinary = require('../utils/uploadFile');

const createProduct = AsyncHandler(async (req, res) => {
    const {name, sku, description, category, quantity, price} = req.body;

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
            user: req.user.id,
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


module.exports = {
    createProduct,
}