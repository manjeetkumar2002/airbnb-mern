const User = require("../models/user.model.js")
const validate = require("../utils/validate.js")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY
const redisClient = require("../config/redis.js")

const register = async(req,res)=>{
    try {
        
        validate(req.body)
        // step1 :validate the data
        const {firstName,lastName,userName,emailId,password} = req.body
        // step2 :hash the password
        const hashedPassword = await bcrypt.hash(password,10)
        // step3 :store the user into db
        const user = await User.create({
            firstName,
            lastName,
            userName,
            emailId,
            password:hashedPassword
        })
        // step4 :generate a token
        const token = await jwt.sign({userId:user._id},JWT_SECRET_KEY,{expiresIn:60*60}) // 1hr in seconds
        res.cookie("token",token,{maxAge:60*60*1000}) // 1 hour in miliseconds
        res.status(201).json({
            user,
            message:"Register successfully"
        })
    }catch (error) {
    console.error(error);

    return res.status(500).json({
        success: false,
        message:
            process.env.NODE_ENV === "development"
                ? error.message
                : "Internal Server Error"
    });
}
}

const login = async(req,res)=>{
    try{
        const {emailId,password} = req.body
        if(!emailId){
            throw new Error("Invalid Credentials")
        }
        if(!password){
            throw new Error("Invalid Credentials")
        }

        const user = await User.findOne({emailId:emailId})
        if(!user){
            throw new Error("Invalid Credentials")
        }

        // match the password
        const isMatch = await bcrypt.compare(password,user.password)

        if(!isMatch){
            throw new Error("Invalid Credentials password")
        }

        // send the token to user
        const token = await jwt.sign({userId:user._id},JWT_SECRET_KEY,{expiresIn:60*60})
        res.cookie("token",token,{maxAge:60*60*1000})

        res.status(200).json({
            user,
            message:"Login Successfully"
        })

    }
    catch(error){
        console.log(error)
        res.status(500).json({
            message:process.env.NODE_ENV === "development"? error.message :"Internal Server Error"
        })
    }
}

const logout = async(req,res)=>{
    try {
        const {token} = req.cookies
        const payload = jwt.decode(token)
        await redisClient.set(`project:airbnb:token:${token}`,"Blocked")
        await redisClient.expireAt(`project:airbnb:token:${token}`,payload.exp)

        res.cookie("token",null,{expires:new Date(Date.now())})
        res.status(200).json({
            message:"Logout Successfully"
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message:process.env.NODE_ENV === "development"?error.message :"Internal Server Error"
        })
    }
}

module.exports = {register,login,logout}