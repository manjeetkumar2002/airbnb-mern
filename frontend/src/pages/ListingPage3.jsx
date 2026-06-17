import React, { useContext } from "react";
import { listingContext } from "../context/ListingContext";
import axiosClient from "../utils/axiosClient";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

const ListingPage3 = () => {
  const { listingFormData, setListingFormData } = useContext(listingContext);
  const [loading,setLoading] = useState(false)
  console.log(listingFormData);
  const navigate = useNavigate();
  async function uploadListing() {
    setLoading(true)
    try {
      const formData = new FormData();

      Object.keys(listingFormData).forEach((key) => {
        if (key === "images") {
          listingFormData.images.forEach((img) => {
            formData.append("images", img);
          });
        } else {
          formData.append(key, listingFormData[key]);
        }
      });
      const result = await axiosClient.post("/listing/create", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(result.data);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
    setLoading(false)
  }
  return (
    <div className="max-w-[1280px] mx-auto h-screen ">
      <div
        onClick={() => navigate("/listingpage2")}
        className="fixed top-3 left-3 p-4 rounded-full bg-secondary cursor-pointer"
      >
        <FaArrowLeft />
      </div>
      <div className="py-6">
        <h3 className="text-4xl">{listingFormData?.title}</h3>
      </div>
      <div className="flex h-[60%] mb-4">
        <div className="w-[60%]">
          <img
            className="h-full w-full"
            src={URL.createObjectURL(listingFormData?.images[0])}
            alt=""
          />
        </div>
        <div className="w-[40%]">
          <div className="h-[50%]">
            <img
              className="h-full w-full"
              src={URL.createObjectURL(listingFormData?.images[1])}
              alt=""
            />
          </div>
          <div className="h-[50%]">
            <img
              className="h-full w-full"
              src={URL.createObjectURL(listingFormData?.images[2])}
              alt=""
            />
          </div>
        </div>
      </div>
      <div>
        <p className="text-2xl mb-3">{listingFormData?.description}</p>
      </div>
      <div>
        <p className="text-2xl mb-3">₹{listingFormData?.pricePerNight}/day</p>
      </div>
      <div>
        <button disabled={loading}
          onClick={uploadListing}
          className="btn btn-secondary max-w-[200px] mt-[20px] w-full"
        >
          {loading?"Adding...":"Add Listing"}
        </button>
      </div>
    </div>
  );
};

export default ListingPage3;
