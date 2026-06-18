import React, { useContext, useEffect, useState } from 'react'
import axiosClient from '../utils/axiosClient'
import Card from '../component/Card'
import { bookingContext } from '../context/BookingContext'
const MyBooking = () => {
  const {booking,setBooking} = useContext(bookingContext)
  return (
    <div className='max-w-[1280px] mx-auto py-[50px]'>
      <div className='text-4xl text-center p-4 border-1 border-gray-400 w-full max-w-[600px] mx-auto'>My Booking</div>
      {booking.length > 0 ? (
        <div className="mt-[30px] grid place-items-center grid-cols-1  sm:grid-cols-2  md:grid-cols-3 lg:grid-cols-4 gap-[20px]">
          {booking?.map((booking, index) => (
            <Card
              key={index}
              id={booking.listing._id}
              title={booking.listing.title}
              images={booking.listing.images}
              description={booking.listing.description}
              pricePerNight={booking.listing.pricePerNight}
            />
          ))}
        </div>
      ) : (
        <div>
          <p className="text-4xl text-center mt-5">No Booking Found</p>
        </div>
      )}
    </div>
  )
}

export default MyBooking