const express = require("express");
require("dotenv").config();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const dbConnection = require("./config/database");
const userRoutes = require("./routes/userRoute");

const app = express();

// middleware
app.use(express.json());
app.use(cors());
app.use(cookieParser());

const port = process.env.PORT || 4000;

// database connection
dbConnection();

// mount router
app.use("/api/v1/user",userRoutes);

app.get("/",(req,res)=>{
    res.send("<h1>This is home page </h1>")
})

app.listen(port,()=>{
    console.log(`server is running on port ${port}`);
})



