require("dotenv").config();
const mongoose = require("mongoose");

const url = process.env.DATABASE_URL;

// create a function to Database connection
const dbConnection = ()=>{
    mongoose.connect(url)
    .then(()=>{
        console.log("DB Connection Successful");
    }).catch((error)=>{
        console.log("DB Connection Failed");
        console.error(error);
        process.exit(1);
    })
}

// export dbConnection function
module.exports = dbConnection;