// POST   /listing/create
// GET    /listing/all
// GET    /listing/:id
// PATCH  /listing/:id
// DELETE /listing/:id
const Listing = require("../models/listing.model.js");
const uploadOnCloudinary = require("../config/cloudinary.js");
const mongoose = require("mongoose");
const createListing = async (req, res) => {
  try {
    const {
      title,
      description,
      pricePerNight,
      location,
      country,
      city,
      amenities,
      guests,
      bedrooms,
      bathrooms,
    } = req.body;
    const files = req.files || []; // images store in multer
    if (!files.length) {
      return res.status(400).json({
        message: "At least one image is required",
      });
    }
    const host = req.userId;
    const imageUrls = [];
    for (const file of files) {
      const url = await uploadOnCloudinary(file.path);
      if (!url) {
        return res.status(500).json({
          message: "Image upload failed",
        });
      }
      imageUrls.push(url);
    }
    const listing = await Listing.create({
      title,
      description,
      pricePerNight,
      location,
      country,
      images: imageUrls,
      amenities,
      city,
      guests,
      bedrooms,
      bathrooms,
      host,
    });
    res.status(201).json({
      message: "Listing Created Successfully",
      listing,
    });
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

const getAllListing = async (req, res) => {
  try {
    const listing = await Listing.find();
    res.status(200).json(listing);
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

const getListingById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({
        message: "Id is missing",
      });
    }
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "Invalid Listing Id",
      });
    }
    const listing = await Listing.findById({ _id: id });
    if (!listing) {
      return res.status(404).json({
        message: "Listing not found",
      });
    }

    res.status(200).json(listing);
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

const updateListingById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({
        message: "Id is missing",
      });
    }
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "Invalid Listing Id",
      });
    }
    const host = req.userId;
    let listing = await Listing.findOne({ _id: id });

    if (!listing) {
      return res.status(404).json({
        message: "Listing not found",
      });
    }
    if (host !== listing.host.toString()) {
      return res.status(403).json({
        message: "You are not authorized",
      });
    }
    const {
      title,
      description,
      pricePerNight,
      location,
      country,
      city,
      amenities,
      guests,
      bedrooms,
      bathrooms,
    } = req.body;
    const files = req.files || []; // images store in multer
    const imageUrls = [];
    for (const file of files) {
      const url = await uploadOnCloudinary(file.path);
      if (!url) {
        return res.status(500).json({
          message: "Image upload failed",
        });
      }
      imageUrls.push(url);
    }
    const updateData = {
      title,
      description,
      pricePerNight,
      location,
      country,
      amenities,
      city,
      guests,
      bedrooms,
      bathrooms,
    };

    if (imageUrls.length > 0) {
      updateData.images = imageUrls;
    }

    listing = await Listing.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      message: "Listing updated Successfully",
      listing,
    });
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

const deleteListingById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({
        message: "Id is missing",
      });
    }
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "Invalid Listing Id",
      });
    }
    const host = req.userId;
    let listing = await Listing.findOne({ _id: id });

    if (!listing) {
      return res.status(404).json({
        message: "Listing not found",
      });
    }

    if (host !== listing.host.toString()) {
      return res.status(403).json({
        message: "You are not authorized",
      });
    }
    listing = await Listing.findByIdAndDelete({ _id: id });
    res.status(200).json({
      message: "Listing deleted successfully",
    });
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
  createListing,
  getAllListing,
  getListingById,
  updateListingById,
  deleteListingById,
};
