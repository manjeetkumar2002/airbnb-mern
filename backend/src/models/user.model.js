const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    firstName:{
        type:String,
        require:true
    },
    lastName:{
        type:String,
        require:true
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
    }
})

const User = new mongoose.model("User",userSchema)

module.exports = User