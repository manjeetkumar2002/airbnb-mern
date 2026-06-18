import React, { useContext, useState } from "react";
import { listingContext } from "../context/ListingContext";
import { GiFamilyHouse } from "react-icons/gi";
import { GrSwim } from "react-icons/gr";
import { MdApartment } from "react-icons/md";
import { GiShop } from "react-icons/gi";
import { GiWoodCabin } from "react-icons/gi";
import { LuBedDouble } from "react-icons/lu";
import { IoBed } from "react-icons/io5";
import { FaTreeCity } from "react-icons/fa6";
import { FaFire } from "react-icons/fa";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { listingpage2schema } from "../schemas/listingpage2.js";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const categories = [
  {
    icon: GiFamilyHouse,
    name: "Villa",
  },
  {
    icon: FaTreeCity,
    name: "Farm House",
  },
  {
    icon: GrSwim,
    name: "Pool House",
  },
  {
    icon: IoBed,
    name: "Rooms",
  },
  {
    icon: MdApartment,
    name: "Flat",
  },
  {
    icon: LuBedDouble,
    name: "PG",
  },
  {
    icon: GiWoodCabin,
    name: "Cabin",
  },
  {
    icon: GiShop,
    name: "Shop",
  },
];
const ListingPage2 = () => {
  const { listingFormData, setListingFormData } = useContext(listingContext);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({ resolver: zodResolver(listingpage2schema) });

  const [selectedCategory, setSelectedCategory] = useState("");
  function handleCategorySelect() {
    if (!selectedCategory) {
      alert("Select a category");
      return;
    }
    setListingFormData((prev) => ({
      ...prev,
      category: selectedCategory,
    }));
    navigate("/listingpage3");
  }
  return (
    <div className="h-screen w-screen">
      <div className="flex justify-between py-4 px-4">
        <div
          onClick={() => navigate("/listingpage1")}
          className=" p-4 rounded-full bg-secondary cursor-pointer"
        >
          <FaArrowLeft />
        </div>
        <div>
          <button className="btn btn-secondary rounded-full">
            SetUp Your Category
          </button>
        </div>
      </div>
      <div className="my-[60px]">
        <p className="text-3xl text-center">
          Which of these best decribes your place?
        </p>
      </div>
      <div className="flex mx-auto  flex-wrap max-w-[550px] w-full justify-center gap-y-[50px] gap-x-[20px] ">
        {categories.map((category, index) => (
          <div
            key={index}
            onClick={() => setSelectedCategory(category?.name)}
            className={`${selectedCategory === category.name ? "text-secondary" : "text-white"} cursor-pointer p-4 w-[150px] border px-8 rounded-lg flex flex-col items-center
      ${
        selectedCategory === category.name
          ? "border-secondary"
          : "border-gray-300"
      }`}
          >
            <category.icon className="text-3xl " />
            <p>{category.name}</p>
          </div>
        ))}
      </div>
      <div className="w-full">
        <button
          onClick={handleCategorySelect}
          type="submit"
          className="fixed bottom-5 right-5 btn btn-secondary max-w-[200px] w-full"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ListingPage2;
