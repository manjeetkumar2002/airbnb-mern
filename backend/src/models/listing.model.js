const mongoose = require("mongoose")

const listingSchema = new mongoose.Schema({
    title: String,
    description: String,
    pricePerNight: Number,
    location: String,
    country: String,
    city: String,

    images:[String],
    amenities:[String],
    guests:Number,
    bedrooms:Number,
    bathrooms:Number,
    host:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
},{
    timestamps:true
})


const Listing = new mongoose.model("Listing",listingSchema)