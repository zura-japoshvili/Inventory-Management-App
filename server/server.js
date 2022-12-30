const dotenv = require("dotenv").config();
const cors = require("cors");
const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require('body-parser');
const userRoute = require("./Routes/userRoutes");
const productRoute = require('./Routes/productRoutes');
const errorHandler = require("./middleWare/errorMiddleware");
const cookieParser = require("cookie-parser");
const path = require('path');


const app = express();

const PORT = process.env.PORT || 8000;


// Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(
    cors({
        origin: ["http://localhost:4200", 'http://localhost:4200/newProduct'],
        methods: ['GET', 'POST', "PUT", "GET", "DELETE", "PATCH"],
        credentials: true
    })
)

// app.use("/uploads", express.static(path.join(__dirname, "uploads")));



// Routes Middleware
app.use("/api/users/", userRoute);
app.use("/api/product/", productRoute);

// Error Middleware
app.use(errorHandler);

// Routes
app.get("/" , (req, res) => {
    res.send("Home page");
})

// connecting to server and start server.
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        })
    }).catch((error) => {
    console.log("Server isn't running");
    console.log(error);
});
