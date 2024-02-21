// importing user model
const User = require("../models/user");

// import bcrypt
const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");

// handler for creat user
exports.register = async (req, res) => {
  try {
    // fetch data from req.body
    const { userName, email, password } = req.body;

    // validate user input
    if (!userName || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // check if user is already register
    const existingUser = await User.findOne({ email });

    // if register show a toast and return

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User is already exist with this email, please login",
      });
    }

    // hash password
    const hashPassword = await bcrypt.hash(password, 10);

    // create a user
    const user = await User.create({
      userName,
      email,
      password: hashPassword,
    });

    // return response
    return res.status(201).json({
      success: true,
      message: "User created successfully",
      user,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// handler for login user

exports.login = async (req, res) => {
  try {
    // fetch email ans password from req.body
    const { email, password } = req.body;

    // validate
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // check user is exist or not
    const user = await User.findOne({ email }).populate("posts").exec();

    // if user is not register rturn an error and show a toast
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User is not register, please register first",
      });
    }

    // compare password
    const checkPassword = await bcrypt.compare(password, user.password);

    // if password is incorrect return error ans show a toast
    if (!checkPassword) {
      return res.status(400).json({
        success: false,
        message: "Password is incorrect",
      });
    }

    // create token
    const token = jwt.sign(
      {
        email: user.email,
        id: user._id,
        userName: user.userName,
      },
      "ramkumar256",
      { expiresIn: "30d" }
    );

    // remove password from user object
    user.password = undefined;

    const options = {
      httpOnly: true,
    };

    // return response
    return res.cookie("token", token, options).status(200).json({
      success: true,
      message: "Login Successful",
      token,
      user,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Unable to login, please try again",
    });
  }
};

// handler for update user
exports.updateUser = async (req, res) => {
  try {
    // find user id from params
    const id = req.user.id;

    // fetch data from body

    const { userName, email, password } = req.body;

    // before save data in db , hash password if password is available
    let hashPassword;
    if(password){
      hashPassword = await bcrypt.hash(password,10);
    }
    console.log(hashPassword)

    // query for update user
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { userName, email, password : hashPassword },
      { new: true }
    )
      .populate("posts")
      .exec();

    // return resposne for successful update user
    updatedUser.password = undefined;
    return res.status(200).json({
      success: true,
      message: "User updated successfully",
      updatedUser,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Unable to update user data ",
    });
  }
};

// handler for delete user

exports.deleteUser = async (req, res) => {
  try {
    // get user id
    const id = req.user.id;

    // query for delete user
    await User.findByIdAndDelete(id);

    return res.status(200).json({
      success: true,
      message: "User account deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "internal server error",
    });
  }
};
