// POST   /listing/create
// GET    /listing/all
// GET    /listing/:id
// PATCH  /listing/:id
// DELETE /listing/:id
const Listing = require("../models/listing.model.js");
const uploadOnCloudinary = require("../config/cloudinary.js");
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
    const files = req.files; // images store in multer
    const host = req.userId;
    const imageUrls = [];
    for (const file of files) {
      const url = await uploadOnCloudinary(file.path);
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
    req.status(500).json({
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
      throw new Error("Id is missing");
    }
    const listing = await Listing.findById({ _id: id });
    if (!listing) {
      throw new Error("listing not found");
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
    const {id} = req.params
    if (!id) {
      return res.status("Id is missing");
    }
    const host = req.userId;
    const listing = await listing.findOne({_id:id})
    if(host !== listing.host){
      throw new Error("Invalid User")
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
    const files = req.files; // images store in multer
    const imageUrls = [];
    for (const file of files) {
      const url = await uploadOnCloudinary(file.path);
      imageUrls.push(url);
    }
    const listing = await Listing.findByIdAndUpdate({_id:id},{
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
    },{new:true});
    res.status(201).json({
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
      return res.status("Id is missing");
    }
    const host = req.userId;
    const listing = await listing.findOne({_id:id})
    if(host !== listing.host){
      throw new Error("Invalid User")
    }
    const listing = await Listing.findByIdAndDelete({ _id: id });
    res.status("Listing deleted successfully");
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
