const express = require("express")

const reviewRouter = express.Router()
reviewRouter.post("/create/:listingId",isAuth,createReview)
reviewRouter.get("/:listingId",isAuth,getListingReviews)
reviewRouter.patch("/:reviewId",isAuth,updateReview)
reviewRouter.delete("/:reviewId",isAuth,deleteReview)

module.exports = reviewRouter