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
        require:true,
        unique:true
    },
    emailId:{
        type:String,
        require:true,
        unique:true
    },
    password:{
        type:String,
        require:true,
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