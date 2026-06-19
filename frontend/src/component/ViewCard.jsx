import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosClient from "../utils/axiosClient";
import { FaArrowLeft } from "react-icons/fa";
import { userContext } from "../context/UserContext";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { listingpage1schema } from "../schemas/listingpage1.js";
import { z } from "zod";
import { listingContext } from "../context/ListingContext.jsx";
import { RxCross1 } from "react-icons/rx";
import { MessageContext } from "../context/MessageContext.jsx";
import { bookingContext } from "../context/BookingContext.jsx";

const schema = z.object({
  title: z.string().min(3, "Title is required"),
  description: z.string().min(10, "Description is required"),

  pricePerNight: z.coerce.number(),

  city: z.string(),
  country: z.string(),
  location: z.string(),

  amenities: z.array(z.string()),

  bedrooms: z.coerce.number(),
  bathrooms: z.coerce.number(),
  images: z
    .array(z.instanceof(File))
    .min(4, "Upload exactly 4 images")
    .max(4, "Upload exactly 4 images")
    .optional(),
});
const bookingSchema = z.object({
  checkIn:z.date(),
  checkOut:z.date()
})
const fields = [
  { name: "title", label: "Title", type: "text" },
  { name: "description", label: "Description", type: "text" },
  { name: "pricePerNight", label: "Price Per Night", type: "number" },
  { name: "bedrooms", label: "No. Of Bedrooms", type: "number" },
  { name: "bathrooms", label: "No. Of Bathrooms", type: "number" },
  { name: "location", label: "Location", type: "text" },
  { name: "city", label: "City", type: "text" },
  { name: "country", label: "Country", type: "text" },
];
const ViewCard = () => {
  const { id } = useParams();
  const [listing, setListing] = useState(null);
  const navigate = useNavigate();
  const { userData } = useContext(userContext);
  const [edit, setEdit] = useState(false);
  const [booking,setBooking] = useState(false)
  const {fetchAllBooking} = useContext(bookingContext) 
  const {showMessage} = useContext(MessageContext)
  // edit form
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema) });
  // Booking Form
const {
  register: bookingRegister,
  handleSubmit: bookingHandleSubmit,
  formState: { errors: bookingErrors },
  watch
} = useForm({
  resolver: zodResolver(bookingSchema),
});
const checkIn = watch("checkIn");
const today = new Date().toISOString().split("T")[0];
const nextDay = checkIn
  ? new Date(checkIn)
  : new Date(today);
  nextDay.setDate(nextDay.getDate() + 1);
  const { fetchAllListing } = useContext(listingContext);
  const amenitiesList = ["Wifi", "Pool", "Parking", "Kitchen", "TV", "AC"];
  async function fetchListing() {
    try {
      const result = await axiosClient.get(`/listing/get/${id}`);
      console.log(result.data);
      setListing(result.data);
    } catch (error) {
      console.log(error);
    }
  }
  async function deleteListing() {
    try {
      const result = await axiosClient.delete(`/listing/delete/${id}`);
      console.log(result.data);
      navigate("/");
      fetchAllListing();
    } catch (error) {
      console.log(error);
    }
  }
  async function updateListing(data) {
    try {
      const formData = new FormData();

      Object.keys(data).forEach((key) => {
        if (key === "images") {
          data.images?.forEach((file) => {
            formData.append("images", file);
          });
        } else if (Array.isArray(data[key])) {
          data[key].forEach((item) => {
            formData.append(key, item);
          });
        } else {
          formData.append(key, data[key]);
        }
      });
      const result = await axiosClient.patch(
        `/listing/update/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );
      navigate("/");
      fetchAllListing();
      console.log(result.data);
    } catch (error) {
      console.log(error);
    }
  }
async function handleBooking(data) {
  try {
    const formData = new FormData();

    formData.append("checkIn", data.checkIn);
    formData.append("checkOut", data.checkOut);

    const checkInDate = new Date(data.checkIn);
    const checkOutDate = new Date(data.checkOut);
    const result = await axiosClient.post(
      `/booking/create/${id}`,
      formData
    );

    console.log(result);
    navigate("/")
    fetchAllBooking()
    showMessage(result.data.message)
  } catch (error) {
    console.log(error);
  }
}
  useEffect(() => {
    fetchListing();
  }, [userData]);
  useEffect(() => {
    if (listing) {
      reset({
        title: listing.title,
        description: listing.description,
        pricePerNight: listing.pricePerNight,
        bedrooms: listing.bedrooms,
        bathrooms: listing.bathrooms,
        location: listing.location,
        city: listing.city,
        country: listing.country,
        amenities: listing.amenities,
      });
    }
  }, [listing, reset]);
  return (
    <div className="max-w-[1280px] mx-auto h-screen ">
      <div
        onClick={() => navigate("/")}
        className="fixed top-3 left-3 p-4 rounded-full bg-secondary cursor-pointer"
      >
        <FaArrowLeft />
      </div>
      {/* view Card data */}
      <div className="py-6">
        <h3 className="text-4xl">{listing?.title}</h3>
      </div>
      <div className="flex h-[60%] mb-4">
        <div className="w-[60%]">
          <img className="h-full w-full" src={listing?.images[0]} alt="" />
        </div>
        <div className="w-[40%]">
          <div className="h-[50%]">
            <img className="h-full w-full" src={listing?.images[1]} alt="" />
          </div>
          <div className="h-[50%]">
            <img className="h-full w-full" src={listing?.images[2]} alt="" />
          </div>
        </div>
      </div>
      <div>
        <p className="text-2xl mb-3">{listing?.description}</p>
      </div>
      <div>
        <p className="text-2xl mb-3">₹{listing?.pricePerNight}/day</p>
      </div>
      <div>
        <button
          onClick={() =>{
            if (userData?._id === listing?.host) {
              setEdit(true); 
            } else {
              // Booking wala function
              setBooking(true)
            }
          }}
          className="btn btn-secondary max-w-[200px] mt-[20px] w-full"
        >
          {userData?._id === listing?.host ? "Edit Listing" : "Reserve"}
        </button>
      </div>
      {/* edit listing popup */}
      {edit && (
        <div className="z-100 fixed top-0 left-0 right-0 h-screen bg-black opacity-80"></div>
      )}
      {/* edit form */}
      {edit && (
        <div className="flex justify-center items-start fixed left-0 top-[20px] w-full z-200">
          <div onClick={()=>setEdit(false)} className="cursor-pointer relative top-[-10px] left-4 p-4 bg-secondary text-white rounded-full text-xl">
          <RxCross1  />
          </div>
          <form
            onSubmit={handleSubmit(updateListing)}
            className="mx-auto max-w-[800px] w-full flex flex-col h-screen pb-[50px] bg-black z-200 gap-[20px] overflow-y-auto p-5"
          >
            {fields.map((field) => (
              <div
                key={field.name}
                className="form-control flex flex-col gap-[10px]"
              >
                <label className="label">
                  <span className="label-text">{field.label}</span>
                </label>

                <input
                  {...register(field.name)}
                  className="input w-full"
                  type={field.type}
                />

                {errors[field.name] && (
                  <p className="text-red-500">{errors[field.name].message}</p>
                )}
              </div>
            ))}
            {/* images input */}
            <div className="form-control flex flex-col gap-[10px]">
              <label className="label">
                <span className="label-text">Images (4 images only)</span>
              </label>
              <input
                className="input w-full"
                type="file"
                multiple
                accept="image/*"
                onChange={(e) => {
                  const files = Array.from(e.target.files);
                  setValue("images", files, {
                    shouldValidate: true,
                  });
                }}
              />

              {errors.images && (
                <p className="text-red-500">{errors.images.message}</p>
              )}
            </div>
            {/* amenities input */}
            <div className="form-control flex gap-[10px]">
              <label className="label">
                <span className="label-text">Amenitites :</span>
              </label>
              {amenitiesList.map((item) => (
                <label key={item} className="flex gap-2">
                  <input
                    type="checkbox"
                    value={item}
                    {...register("amenities")}
                  />
                  {item}
                </label>
              ))}
            </div>

            {/* submit btn */}
            <div className="flex justify-between items-center gap-[20px]">
              <button
                type="submit"
                className="btn btn-secondary max-w-[48%] w-full"
              >
                Update Listing
              </button>
              <button
                type="button"
                onClick={deleteListing}
                className="btn btn-secondary max-w-[48%] w-full"
              >
                Delete Listing
              </button>
            </div>
          </form>
        </div>
      )}
      {
        booking &&<div className="z-100 fixed top-0 left-0 right-0 h-screen bg-black opacity-80"></div>

      }
      {
        booking && <div className="fixed z-300 top-0 right-0 left-0 h-screen flex justify-center items-center">
          <div onClick={()=>setBooking(false)} className="fixed top-2 cursor-pointer left-4 p-4 bg-secondary text-white rounded-full text-xl">
          <RxCross1  />
          </div>
          <div className="flex gap-2">
            <div className="w-[400px] rounded-2xl bg-white text-black p-4">
              <h4 className="text-2xl text-center py-2 border-b-1 border-gray-400">Confirm & Book</h4>
              <p className="text-[18px] py-2">Your Trip-</p>
              <form onSubmit={bookingHandleSubmit(handleBooking)}>
              <div className="form-control flex gap-2 my-3 mx-[30px]">
                <label className="label text-black mr-[12px]">
                  <span className="label-text">
                    CheckIn
                  </span>
                </label>
                <div className="border-1 p-1 rounded-md">
                <input {...bookingRegister("checkIn",{valueAsDate:true})} min={today} className="h-full w-full outline-0"  type="date" />
                {bookingErrors.checkIn && (
                <p className="text-red-500">{bookingErrors.checkIn.message}</p>
              )}
                </div>
              </div>
              <div className="form-control flex gap-2 my-3 mx-[30px]">
                <label className="label text-black">
                  <span className="label-text">
                    CheckOut
                  </span>
                </label>
                <div className="border-1 p-1 rounded-md">
                <input {...bookingRegister("checkOut",{valueAsDate:true})} min={nextDay.toISOString().split("T")[0]} className="h-full w-full outline-0" type="date" />
                {bookingErrors.checkOut && (
                <p className="text-red-500">{bookingErrors.checkOut.message}</p>
              )}
                </div>
              </div>
                <button type="submit" className="btn btn-secondary w-full my-2">Book Now</button>
              </form>
            </div>
            <div className="w-[400px] rounded-2xl bg-white p-3">
              <div className="border-1 flex gap-[20px] rounded-md border-gray-400 p-2 h-[120px]">
                <img className="h-full w-[150px]" src={listing.images?.[0]} alt="" />
                <div className="text-black">
                  <span className="text-[17px] block mb-1 ">{listing.title}</span>
                  <span className="text-[16px] block text-gray-700">{listing.description}</span>
                </div>
              </div>
              <div className="border-1 text-black border-gray-400 mt-[10px] p-2 rounded-md">
                <p>Booking Price </p>
                <p className="border-t-1 border-gray-400 mt-[20px]">Total Price</p>
              </div>
            </div>
          </div>
        </div>
      }
    </div>
  );
};

export default ViewCard;
