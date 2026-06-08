const mongoose = require("mongoose")

const bookingSchema = new mongoose.Schema({
    guest:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    listing:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Listing"
    },
    checkIn:Date,
    checkOut:Date,
    totalPrice:Number,

    status:{
        type:String,
        enum:["pending","confirmed","cancelled"],
        default:"pending"
    }
})

const Booking = new mongoose.model("Booking",bookingSchema)
module.exports = Booking