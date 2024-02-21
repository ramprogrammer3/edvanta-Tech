require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const userRouter = require("./routers/userRoutes");
const postRouter = require("./routers/postRoute");

const dbConnection = require("./config/database");

const app = express();

// port
const port = process.env.PORT || 4000;

// middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors());

// database connection
dbConnection();

// mount router
app.use("/api/v1/user", userRouter);

app.use("/api/v1/post", postRouter);


// test route
app.get("/",(req,res)=>{
  res.send("<h1>This is home page baby!!!...</h1>")
})


app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
