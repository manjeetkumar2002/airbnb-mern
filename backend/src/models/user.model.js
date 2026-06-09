const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    firstName:{
        type:String,
    },
    lastName:{
        type:String,
    },
    userName:{
        type:String,
        required:true,
        unique:true
    },
    emailId:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
    },
    profilePic:{
        type:String
    },
    role:{
        type:String,
        enum:["guest","host"],
        default:"guest"
    }
},{timestamps:true})

const User = new mongoose.model("User",userSchema)

module.exports = User