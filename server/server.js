const dotenv = require("dotenv").config();
const cors = require("cors");
const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require('body-parser');
const userRoute = require("./Routes/userRoutes");
const errorHandler = require("./middleWare/errorMiddleware");
const cookieParser = require("cookie-parser");


const app = express();

const PORT = process.env.PORT || 8000;



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

// Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(
    cors({
        origin: ["http://localhost:4200"],
        credentials: true
    })
)



// Error Middleware
app.use(errorHandler);

// Routes Middleware
app.use("/api/users/", userRoute);

// Routes
app.get("/" , (req, res) => {
    res.send("Home page");
})


