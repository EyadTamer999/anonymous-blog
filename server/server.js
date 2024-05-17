const express = require('express');
const bodyParser = require("body-parser");
const cors = require("cors");
require('dotenv').config();
const fileUpload = require('express-fileupload');


// Routes
const postRouter = require("./routes/postRoutes")



// CORS options
//allow frontend to access the backend
const corsOptions = {
    origin: ["http://34.207.114.136:3000", "http://anonymous-blog-alb-1425231859.us-east-1.elb.amazonaws.com", "https://d30ltoy5jfdxlq.cloudfront.net"],
}

// Create an instance of the express app
const app = express();

app.use(express.json());
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(fileUpload());

//Routes
app.use("/api/post", postRouter);


// Start the server
app.listen(3001, () => {
    console.log("Server is now listening at port 3001 on http://localhost:3001/");
})



