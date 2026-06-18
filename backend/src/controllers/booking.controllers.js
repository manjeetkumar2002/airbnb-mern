const Booking = require("../models/booking.model");
const Listing = require("../models/listing.model");

const createBooking = async (req, res) => {
  try {
    const userId = req.userId;
    const { listingId } = req.params;
    const { checkIn, checkOut } = req.body;
    const mandatoryFields = ["checkIn", "checkOut"];
    const isAllowed = mandatoryFields.every((k) =>
      Object.keys(req.body).includes(k),
    );
    if (!isAllowed) {
      throw new Error("Some fields are missing");
    }
    if (!listingId) {
      throw new Error("Listing Id is Missing");
    }
    const start = new Date(checkIn);
    const end = new Date(checkOut);

    if (start >= end) {
      throw new Error("Check-out must be after check-in");
    }

    const listing = await Listing.findById({ _id: listingId });

    if (!listing) {
        throw new Error("Lisitng not Found");
    }
    const days = Math.ceil(
  (end - start) / (1000 * 60 * 60 * 24)
);
    const totalPrice = days * listing.pricePerNight;
    if (listing.host.toString() === userId) {
      throw new Error("You cannot book your own property");
    }

    const conflictingBooking = await Booking.findOne({
      listing: listingId,
      status: { $ne: "cancelled" },

      checkIn: {
        $lt: new Date(checkOut),
      },

      checkOut: {
        $gt: new Date(checkIn),
      },
    });

    if (conflictingBooking) {
      throw new Error("Property is already booked for selected dates");
    }
    const booking = await Booking.create({
      guest: userId,
      listing: listingId,
      checkIn,
      checkOut,
      totalPrice,
      status: "confirmed",
    });
    res.status(201).json({
      message: "Booking created Successfully",
      booking,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      message:
        process.env.NODE_ENV === "development"
          ? error.message
          : "Internal Server Error",
    });
  }
};

const cancelBooking = async (req, res) => {
  try {
    const userId = req.userId;
    // check if userId match with host id then only he can confirm the booking
    const { bookingId } = req.params;
    if (!bookingId) {
      throw new Error("Booking Id is Missing");
    }
    const booking = await Booking.findById({ _id: bookingId }) .populate("listing")
  .populate("guest");
    if (!booking) {
      throw new Error("Booking not present");
    }
    if (booking.status === "cancelled") {
    throw new Error("Booking already cancelled");
    }
    const isHost = booking.listing.host.toString() === userId;

    const isGuest = booking.guest.toString() === userId;

    if (!isHost && !isGuest) {
      throw new Error("Unauthorized");
    }
    booking.status = "cancelled";
    await booking.save();

    res.status(200).json({
      message: "booking is cancelled successfully",
      booking,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      message:
        process.env.NODE_ENV === "development"
          ? error.message
          : "Internal Server Error",
    });
  }
};

const guestAllBooking = async (req, res) => {
  try {
    const userId = req.userId;
    const bookings = await Booking.find({ guest: userId }).populate("listing");
    res.status(200).json(bookings);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message:
        process.env.NODE_ENV === "development"
          ? error.message
          : "Internal Server Error",
    });
  }
};

const hostAllBooking = async (req, res) => {
  try {
    const userId = req.userId;
    // finding all listing of host
    const listing = await Listing.find({ host: userId });
    const listingIds = listing.map((listing) => listing._id);

    const bookings = await Booking.find({
      listing: { $in: listingIds },
    })
      .populate("guest")
      .populate("listing");
    res.status(200).json(bookings);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message:
        process.env.NODE_ENV === "development"
          ? error.message
          : "Internal Server Error",
    });
  }
};

module.exports = {
  createBooking,
  cancelBooking,
  guestAllBooking,
  hostAllBooking,
};
