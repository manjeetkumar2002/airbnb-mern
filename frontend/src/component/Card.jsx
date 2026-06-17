import React from "react";
import { useNavigate } from "react-router-dom";

const Card = ({ id,title, description, images, pricePerNight }) => {
  const navigate = useNavigate()
  return (
    <div onClick={()=>{console.log("clicked"); navigate(`/listing/${id}`)}} className="h-[380px] cursor-pointer card bg-base-100 max-w-75 w-full shadow-sm">
      <div className="h-54 flex overflow-x-auto snap-x snap-mandatory scrollbar-hide">
        {images.map((img, index) => (
          <img
            key={index}
            src={img}
            alt="listing"
            className="w-full h-full object-cover flex-shrink-0 snap-center"
          />
        ))}
      </div>
      <div className="card-body">
        <h2 className="card-title line-clamp-1">{title}</h2>
        <p className="line-clamp-2">{description}</p>
        <p>₹{pricePerNight}/day</p>
      </div>
    </div>
  );
};

export default Card;
