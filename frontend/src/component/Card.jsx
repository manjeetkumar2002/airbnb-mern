import React ,{useContext, useState} from "react";
import { useNavigate} from "react-router-dom";
import { FaRegCircleCheck } from "react-icons/fa6";
import { MdBlock } from "react-icons/md";
import { bookingContext } from "../context/BookingContext";
import axiosClient from "../utils/axiosClient";

const Card = ({ id, title, description, images, pricePerNight }) => {
  const navigate = useNavigate();
  const {booking,setBooking,fetchAllBooking} = useContext(bookingContext)
  const [cancelBooking,setCancelBooking] = useState(false)
  const currentBooking = booking?.find(
  (item) => item.listing?._id === id
);
  async function handleCancelBooking(bookingId) {
    try {
      const result = await axiosClient.delete(`/booking/cancel/${bookingId}`)
      console.log(result.data)
      fetchAllBooking()
      setCancelBooking(false)
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div
      onClick={() => {
        navigate(`/listing/${id}`);
      }}
      className="relative group  h-[380px] cursor-pointer card bg-base-100 max-w-75 w-full shadow-sm"
    >
      <div className="h-54 flex group-hover:opacity-50 transition-opacity duration-400 overflow-x-auto snap-x snap-mandatory scrollbar-hide">
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
      {/* buttons */}
      {booking?.some(item => item.listing?._id === id) && <div
        className="opacity-0 group-hover:opacity-100
    transition-all duration-400
    z-10 absolute top-0 flex flex-col items-end right-0 gap-[10px]"
      >
        <button
          onClick={(e) => {
            e.stopPropagation();
          }}
          className="btn bg-white text-success border-0 outline-0 text-[16px] w-[120px]"
        >
          <FaRegCircleCheck /> Booked
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            setCancelBooking(!cancelBooking)
          }}
          className="btn bg-white text-error border-0 outline-0 text-[16px]"
        >
          <MdBlock className="text-[16px]" /> Cancel Booking
        </button>
        
        
      </div>}
     {/* cancel popup */}
        {cancelBooking && <div onClick={(e)=>e.stopPropagation()} className="absolute text-black bg-white rounded-md gap-[30px] group-hover:opacity-100 opacity-0 transition-all duration-400 top-[100px] p-4 border-1 left-1 right-1">
          <div className="text-xl text-center mb-[10px]">Booking Cancel!</div>
          <div className="flex gap-[10px] items-center justify-between">
            <div className="text-error">Are you Sure?</div>
            <div className="flex gap-[10px]">
               <button onClick={()=>handleCancelBooking(currentBooking?._id)} className="btn btn-error">Yes</button>
                <button onClick={(e)=>{e.stopPropagation();setCancelBooking(false)}} className="btn btn-error">No</button>
            </div>
          </div>
         
        </div>}
    </div>
  );
};

export default Card;
