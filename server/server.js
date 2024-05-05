const express = require('express');
const bodyParser = require("body-parser");
const AWS = require("aws-sdk");
const cors = require("cors");
require('dotenv').config();


// Routes
const postRouter = require("./routes/postRoutes")


// AWS configuration
AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION
});

// CORS configuration
const corsOptions = {
    origin: "http://localhost:3000",
    credentials: true
};

// Create an instance of the express app
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOptions));
app.use(bodyParser.json());

//Routes
app.use("/post", postRouter);


// Start the server
app.listen(3001, () => {
    console.log("Server is now listening at port 3000 on http://localhost:3000/");
})



