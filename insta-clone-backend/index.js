const express = require("express");
require("dotenv").config();
const cors = require("cors");
const dbConnection = require("./config/database");

const app = express();

// middleware
app.use(express.json());
app.use(cors());

const port = process.env.PORT || 4000;

// database connection
dbConnection();


app.get("/",(req,res)=>{
    res.send("<h1>This is home page </h1>")
})

app.listen(port,()=>{
    console.log(`server is running on port ${port}`);
})



