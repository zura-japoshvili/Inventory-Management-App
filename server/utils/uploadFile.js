const multer = require('multer');
const cloudinary = require('cloudinary').v2
const { CloudinaryStorage } = require("multer-storage-cloudinary");

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_SECRET_KEY
})

// These commented lines are image upload functions that work locally

// diskStorage && memoryStorage

// const storage = multer.diskStorage({
//     destination: function (req, res, cb) {
//         cb(null, 'server/uploads')
//     },
//     filename: function (req, file, cb) {
//         cb(
//             null,
//             new Date().toISOString().replace(/:/g, "-") + "-" + file.originalname
//         );
//     },
// })

// const storage = multer.memoryStorage();



const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: "Products",
    },
});

function fileFilter(req, file, cb) {
    if (
        file.mimetype === "image/png" ||
        file.mimetype === "image/jpg" ||
        file.mimetype === "image/jpeg"
    ) {
        cb(null, true);
    } else {
        cb(null, false);
    }
}

const upload = multer({ storage: storage, fileFilter });

// File Size Formatter
const fileSizeFormatter = (bytes, decimal) => {
    if (bytes === 0) {
        return "0 Bytes";
    }
    const dm = decimal || 2;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "YB", "ZB"];
    const index = Math.floor(Math.log(bytes) / Math.log(1000));
    return (
        parseFloat((bytes / Math.pow(1000, index)).toFixed(dm)) + " " + sizes[index]
    );
};



module.exports = {
 upload, fileSizeFormatter,cloudinary
}