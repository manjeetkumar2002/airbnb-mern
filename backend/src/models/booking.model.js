const mongoose = require("mongoose")

const bookingSchema = new mongoose.Schema({
    guest:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        require:true
    },
    listing:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Listing",
        require:true
    },
    checkIn:{
        type:Date,
        require:true
    },
    checkOut:{
        type:Date,
        require:true
    },
    totalPrice:{
        type:Number,
        require:true
    },

    status:{
        type:String,
        enum:["pending","confirmed","cancelled"],
        default:"pending"
    }
})

const Booking = new mongoose.model("Booking",bookingSchema)
module.exports = Booking