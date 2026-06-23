import React, { useEffect ,useState } from 'react'
import axiosClient from '../utils/axiosClient'
import Card from '../component/Card'
const MyListing = () => {
  const [myListing,setMyListing] = useState([])
  async function getMyListing(){
    try {
      const result = await axiosClient.get("/listing/my-listing")
      console.log(result.data)
      setMyListing([...result.data])
    } catch (error) {
      console.log(error?.response?.data?.message)
      showMessage(error?.response?.data?.message,false);
    }
  }
  useEffect(()=>{
    getMyListing()
  },[])
  return (
    <div className='max-w-[1280px] mx-auto py-[50px]'>
      <div className='text-4xl text-center p-4 border-1 border-gray-400 w-full max-w-[600px] mx-auto'>My Listing</div>
      {myListing.length > 0 ? (
        <div className="mt-[30px] grid place-items-center grid-cols-1  sm:grid-cols-2  md:grid-cols-3 lg:grid-cols-4 gap-[20px]">
          {myListing?.map((listing, index) => (
            <Card
              key={index}
              id={listing._id}
              title={listing.title}
              images={listing.images}
              description={listing.description}
              pricePerNight={listing.pricePerNight}
            />
          ))}
        </div>
      ) : (
        <div>
          <p className="text-4xl text-center mt-5">No Listing Found</p>
        </div>
      )}
    </div>
  )
}

export default MyListing