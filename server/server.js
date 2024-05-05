const express = require('express');
const bodyParser = require("body-parser");
const cors = require("cors");
require('dotenv').config();


// Routes
const postRouter = require("./routes/postRoutes")



// CORS configuration
const corsOptions = {
    origin: "http://localhost:3000",
    credentials: true
};

// Create an instance of the express app
const app = express();

app.use(express.json());
app.use(cors(corsOptions));
app.use(bodyParser.json());

//Routes
app.use("/api/post", postRouter);


// Start the server
app.listen(3001, () => {
    console.log("Server is now listening at port 3001 on http://localhost:3001/");
})



