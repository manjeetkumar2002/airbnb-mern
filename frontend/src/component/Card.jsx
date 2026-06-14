import React from "react";
import { useNavigate } from "react-router-dom";

const Card = ({ id,title, description, images, pricePerNight }) => {
  const navigate = useNavigate()
  return (
    <div onClick={()=>{console.log("clicked"); navigate(`/listing/${id}`)}} className="cursor-pointer card bg-base-100 w-85 shadow-sm">
      <div className="flex overflow-auto snap-x snap-mandatory">
        {images.map((img, index) => (
          <img
            key={index}
            src={img}
            alt="listing"
            className="w-full h-56 object-cover flex-shrink-0 snap-center"
          />
        ))}
      </div>
      <div className="card-body">
        <h2 className="card-title">{title}</h2>
        <p>{description}</p>
        <p>₹{pricePerNight}/day</p>
      </div>
    </div>
  );
};

export default Card;
