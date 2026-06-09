const mongoose = require("mongoose")

const bookingSchema = new mongoose.Schema({
    guest:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },

    listing:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Listing",
        required:true
    },

    checkIn:{
        type:Date,
        required:true
    },

    checkOut:{
        type:Date,
        required:true
    },

    totalPrice:{
        type:Number,
        required:true
    },

    status:{
        type:String,
        enum:["confirmed","cancelled"],
        default:"confirmed"
    }
},{
    timestamps:true
})

const Booking = new mongoose.model("Booking",bookingSchema)
module.exports = Booking