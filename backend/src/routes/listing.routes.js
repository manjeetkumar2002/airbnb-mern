// POST   /listing/create
// GET    /listing/all
// GET    /listing/:id
// PATCH  /listing/:id
// DELETE /listing/:id
const upload = require("../middleware/multer.js")
const express = require("express")
const {createListing,getAllListing,getListingById,updateListingById,deleteListingById} = require("../controllers/listing.controllers.js")
const isAuth = require("../middleware/isAuth.js")
const listingRouter = express.Router()

listingRouter.post("/create",isAuth,upload.array("images", 4),createListing)
listingRouter.get("/all",isAuth,getAllListing)
listingRouter.get("/:id",isAuth,getListingById)
listingRouter.patch("/:id",isAuth,updateListingById)
listingRouter.delete("/:id",isAuth,deleteListingById)

module.exports = listingRouter