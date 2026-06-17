// POST   /listing/create
// GET    /listing/all
// GET    /listing/:id
// PATCH  /listing/:id
// DELETE /listing/:id
const upload = require("../middleware/multer.js")
const express = require("express")
const {createListing,getAllListing,getListingById,updateListingById,deleteListingById, myListing} = require("../controllers/listing.controllers.js")
const isAuth = require("../middleware/isAuth.js")
const listingRouter = express.Router()

listingRouter.post("/create",isAuth,upload.array("images", 4),createListing)
listingRouter.get("/get/all",isAuth,getAllListing)
listingRouter.get("/get/:id",isAuth,getListingById)
listingRouter.patch("/update/:id",isAuth,upload.array("images", 4),updateListingById)
listingRouter.delete("/delete/:id",isAuth,deleteListingById)
listingRouter.get("/my-listing",isAuth,myListing)
module.exports = listingRouter