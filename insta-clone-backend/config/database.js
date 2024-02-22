require("dotenv").config();
const mongoose = require("mongoose");
const url = process.env.DATABASE_URL;

const dbConnection = ()=>{
    mongoose.connect(url)
    .then(()=>{
        console.log("DB connection successful");
    }).catch((error)=>{
        console.log("DB connection failed");
        console.log(error);
        process.exit(1);
    })
}

module.exports = dbConnection;