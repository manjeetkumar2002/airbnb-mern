const jwt = require("jsonwebtoken")
const redisClient = require("../config/redis.js")
const User = require("../models/user.model.js")
const isAuth = async(req,res,next)=>{
    try {
        // step1 : fetch the token from cookies
        const {token} = req.cookies
        // step2 : check the token is present in cookie or not
        if(!token){
           throw new Error("Token is not present")
        }
        // step3 : verify the token using jwt.verify(token,key) , it return payload
        const payload =await jwt.verify(token,process.env.JWT_SECRET_KEY)
        // step4 : fetch the _id from payload so that we can fetch the user from db
        const {userId} = payload
        if(!userId){
            throw new Error("Invalid Token")
        }
        const user =await User.findOne({_id:userId})
        if(!user){
            throw new Error("User doesn't exist")
        }
        // step5 : check token is blocked or not using redis db
        const isBlocked = await redisClient.exists(`project:airbnb:token:${token}`)
        if(isBlocked){
            throw new Error("Invalid Token")
        }
        // step6 : if not blocked then store the user data we have fetch into the req.body
        req.userId = userId
        
        next()
    } catch (error) {
        console.log(error)
        res.status(401).json({
            message:process.env.NODE_ENV === "development"?error.message:"Internal Server Error"
        })
    }
}

module.exports = isAuth