const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.register = async(req,res)=>{
    try {
        // fetch data from req.body
        const {username,email,password} = req.body;

        // validate data 
        if(!username || !email || !password){
            return res.status(400).json({
                success : false,
                message : "All fields are required",
            })
        }

        // check user email already exist or not

        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.status(400).json({
                success : false,
                message : "User email is already register, please login",
            })
        }

        // check username is exist or not
        const existUsername = await User.findOne({username});
        if(existUsername){
            return res.status(400).json({
                success : false,
                message : "Username is not available, please try another username",
            })
        }


        // hash password
        const hashPassword = await bcrypt.hash(password,10);

        // create user
        const user = await User.create({
            username,
            email,
            password : hashPassword
        })

        // return 201 success response
        return res.status(201).json({
            success : true,
            message : "User register successfully",
            user,
        })
 
    } catch (error) {
        return res.status(500).json({
            success : false,
            message : "Unable to register, please try again",
        })
    }
}


exports.login = async(req,res)=>{
    try {
        // fetch user input
        const {email, password} = req.body;

        if(!email || !password){
            return res.status(400).json({
                success : false,
                message : "All fields are required",
            })
        }

        // check user is available or not
        const user = await User.findOne({email});
        if(!user){
            return res.status(404).json({
                success : false,
                message : "User is not registerd, please register",
            })
        }

        // compare password
        const checkPassword = await bcrypt.compare(password,user.password);
        if(!checkPassword){
            return res.status(400).json({
                success : false,
                message : "Password is incorrect",
            })
        }

        // create token
        const token = jwt.sign({email : user.email,username : user.username,id : user._id},"sha256",{expiresIn : "30d"});
        const options = {
            httpOnly : true,
        }

        user.password = undefined;

        // return response
        return res.cookie("token",token,options).status(200).json({
            success : true,
            message : "Login successful",
            token,
            user
        })

    } catch (error) {
        return res.status(500).json({
            success : false,
            message : "Unable to login , please try again",
        })
    }
}