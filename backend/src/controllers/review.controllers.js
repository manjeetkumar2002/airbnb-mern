const Review = require("../models/review.model")

const createReview = async(req,res)=>{
    try {
        const userId = req.userId
        const {listingId} = req.params
        const {comment,rating} = req.body
        if(!listingId){
           return  res.status(400).json({message:"Listing Id missing"})
        }
        const listing = await Listing.find(listingId)

        if(!listing){
            return res.status(400).json({message:"Listing not found"})
        }

        if(!comment.trim()){
            return res.status(400).json({message:"Invalid Comment"})
        }

        if(rating<1 && rating>5){
            return res.status(400).json({message:"Invalid rating"})
        }
        const review = await Review.create({
            user:userId,
            listing:listingId,
            rating,
            comment
        })
        res.status(201).json({message:"Review added successfull",review})
    } catch (error) {
        console.log(error);
    res.status(500).json({
      message:
        process.env.NODE_ENV === "development"
          ? error.message
          : "Internal Server Error",
    });
        
    }
}

const getListingReviews = async(req,res)=>{
    try {
        const {listingId} = req.params
        if(!listingId){
            return res.status(400).json({message:"Listing Id is missing"})
        }
        const reviews = await Review.find({listing:listingId})
        res.status(200).json(reviews)
    } catch (error) {
        console.log(error);
        res.status(500).json({
        message:
        process.env.NODE_ENV === "development"
          ? error.message
          : "Internal Server Error",
        });
    }   
}
const updateReview = async(req,res)=>{
    try {
        const {reviewId} = req.params
        const {comment,rating} = req.params
        if(!listingId){
            return res.status(400).json({message:"review Id is missing"})
        }

        if(!comment.trim()){
            return res.status(400).json({message:"Invalid Comment"})
        }

        if(rating<1 && rating>5){
            return res.status(400).json({message:"Invalid rating"})
        }

        const review = await Review.findByIdAndUpdate(reviewId,{comment,rating},{new:true,validate:true})
        res.status(200).json({message:"review Updated Successfully",review})
    } catch (error) {
         console.log(error);
        res.status(500).json({
        message:
        process.env.NODE_ENV === "development"
          ? error.message
          : "Internal Server Error",
        });
    }
}
const deleteReview = async(req,res)=>{
    try {
        const {reviewId} = req.params
        if(!reviewId){
            return res.status(400).json("reviewId is missing")
        }
        await Review.findByIdAndDelete(reviewId)
        res.status(200).json({message:"review delete Successfully"})
    } catch (error) {
        console.log(error);
        res.status(500).json({
        message:
        process.env.NODE_ENV === "development"
          ? error.message
          : "Internal Server Error",
        });
    }
}

module.exports = {createReview,getListingReviews,updateReview,deleteReview}