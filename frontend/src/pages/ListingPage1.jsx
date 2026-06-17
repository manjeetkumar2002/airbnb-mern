import React, { useContext } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { listingContext } from "../context/ListingContext";

import { listingpage1schema } from "../schemas/listingpage1.js";

const amenitiesList = ["Wifi", "Pool", "Parking", "Kitchen", "TV", "AC"];
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
const ListingPage1 = () => {
  const navigate = useNavigate();
  const { listingFormData, setListingFormData } = useContext(listingContext);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({ resolver: zodResolver(listingpage1schema) });
  async function onSubmit(data) {
    setListingFormData((prev) => ({
      ...prev,
      ...data,
    }));
    console.log("click page1");
    navigate("/listingpage2");
  }
  return (
    <div className="h-screen">
      <div className="flex justify-between py-4 px-4">
        <div
          onClick={() => navigate("/")}
          className=" p-4 rounded-full bg-secondary cursor-pointer"
        >
          <FaArrowLeft />
        </div>
        <div>
          <button className="btn btn-secondary rounded-full">
            SetUp Your Home
          </button>
        </div>
      </div>
      {/* form  */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mx-auto max-w-[800px] w-full flex flex-col gap-[20px] overflow-y-auto h-[80%] px-5"
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
              <input type="checkbox" value={item} {...register("amenities")} />
              {item}
            </label>
          ))}
        </div>

        {/* submit btn */}
        <div>
          <button
            type="submit"
            className="btn btn-secondary max-w-[200px] w-full"
          >
            Next
          </button>
        </div>
      </form>
    </div>
  );
};

export default ListingPage1;
