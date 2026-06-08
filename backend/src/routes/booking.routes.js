const express = require("express")
const { createBooking, confirmBooking, cancelBooking } = require("../controllers/booking.controllers")
const isAuth = require("../middleware/isAuth.js")
const bookingRouter = express.Router()

bookingRouter.post("/create/:listingId",isAuth,createBooking)
bookingRouter.post("/confirm/:bookingId",isAuth,confirmBooking)
bookingRouter.post("/cancel/:bookingId",isAuth,cancelBooking)

module.exports = bookingRouter