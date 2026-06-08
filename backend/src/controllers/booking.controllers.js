const Booking = require("../models/booking.model")
const Listing = require("../models/listing.model")

const createBooking = async(req,res)=>{
    try {
        const userId = req.userId 
        const {listingId} = req.params
        const {checkIn,checkOut,totalPrice} = req.body
        const mandatoryFields = ["checkIn","checkOut","totalPrice"]
        const isAllowed = mandatoryFields.every((k)=>Object.keys(req.body).includes(k))
        if(!isAllowed){
            throw new Error("Some fields are missing")
        }
        if(!listingId){
            throw new Error("Listing Id is Missing")
        }

        const listing = await Listing.findById({_id:listingId})

        if(!listing){
            throw new Error("Lisitng not Found")
        }
        const booking = await Booking.create({
            guests:userId,
            listing:listingId,
            checkIn,
            checkOut,
            status:"pending"
        })
        res.status(201).json({
            message:"Booking created Successfully",
            booking
        })
    } catch (error) {
        console.log(error.message)
        res.status(500).json({
        message:
        process.env.NODE_ENV === "development"
          ? error.message
          : "Internal Server Error",
    });
    }
}

const confirmBooking = async(req,res)=>{
    try {
        const userId = req.userId
        // check if userId match with host id then only he can confirm the booking
        const {bookingId} = req.params
        if(!bookingId){
            throw new Error("Booking Id is Missing")
        }
        const booking = await Booking.findById({_id:bookingId}).populate("listing")
        if(!booking){
            throw new Error("Booking not present")
        }

        if(userId !=booking.listing.host.toString()){
            throw new Error("You have no access to confirm this booking")
        }

        booking.status = "confirmed"
        await booking.save()

        res.status(200).json({
            message:"booking is confirmed successfully",
            booking
        })
    } catch (error) {
        console.log(error.message)
        res.status(500).json({
        message:
        process.env.NODE_ENV === "development"
          ? error.message
          : "Internal Server Error",
        });
    }
}

const cancelBooking = async(req,res)=>{
    try {
        const userId = req.userId
        // check if userId match with host id then only he can confirm the booking
        const {bookingId} = req.params
        if(!bookingId){
            throw new Error("Booking Id is Missing")
        }
        const booking = await Booking.findById({_id:bookingId}).populate("listing")
        if(!booking){
            throw new Error("Booking not present")
        }

        if(userId !=booking.listing.host.toString()){
            throw new Error("You have no access to confirm this booking")
        }

        booking.status = "cancelled"
        await booking.save()

        res.status(200).json({
            message:"booking is cancelled successfully",
            booking
        })
    } catch (error) {
        console.log(error.message)
        res.status(500).json({
        message:
        process.env.NODE_ENV === "development"
          ? error.message
          : "Internal Server Error",
        });
    }
}

module.exports = {createBooking,confirmBooking,cancelBooking}