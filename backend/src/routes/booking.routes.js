const express = require("express")
const { createBooking, cancelBooking, guestAllBooking, hostAllBooking } = require("../controllers/booking.controllers")
const isAuth = require("../middleware/isAuth.js")
const bookingRouter = express.Router()

bookingRouter.post("/create/:listingId",isAuth,createBooking)
bookingRouter.delete("/cancel/:bookingId",isAuth,cancelBooking)
bookingRouter.get("/my-bookings",isAuth,guestAllBooking)
bookingRouter.get("/host-bookings",isAuth,hostAllBooking)

module.exports = bookingRouter