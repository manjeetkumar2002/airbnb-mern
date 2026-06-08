// POST   /listing/create
// GET    /listing/all
// GET    /listing/:id
// PATCH  /listing/:id
// DELETE /listing/:id
const upload = require("../middleware/multer.js")
const express = require("express")
const {createListing,getAllListing,getListingById,updateListingById,deleteListingById} = require("../controllers/listing.controllers.js")
const listingRouter = express.Router()

listingRouter.post("/create",upload.array("images", 4),createListing)
listingRouter.get("/all",getAllListing)
listingRouter.get("/:id",getListingById)
listingRouter.patch("/:id",updateListingById)
listingRouter.delete("/:id",deleteListingById)

module.exports = listingRouter