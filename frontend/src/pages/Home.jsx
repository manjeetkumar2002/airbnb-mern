import React, { useContext, useEffect } from 'react'
import Nav from '../component/Nav'
import { listingContext } from '../context/ListingContext'
import Card from '../component/Card.jsx'
import ListingFilters from '../component/ListingFilters.jsx'
import { useNavigate } from 'react-router-dom'
const Home = () => {
  const {allListing,filteredListing,setFilteredListing} = useContext(listingContext)
  // console.log(allListing)
  const navigate = useNavigate()
  
  return (
    <div className='max-w-[1280px] pb-5 mx-auto'>
      <Nav/>
      <ListingFilters/>
      {/* listing cards */}
      {filteredListing.length>0?<div className='mt-[30px] grid place-items-center grid-cols-1  sm:grid-cols-2  md:grid-cols-3 lg:grid-cols-4 gap-[20px]'>
        {
          filteredListing?.map((listing,index)=>
            <Card key={index}  id={listing._id} title={listing.title} images={listing.images} description={listing.description} pricePerNight={listing.pricePerNight}/>
          )
        }
      </div>:<div>
        <p className='text-4xl text-center mt-5'>No Listing Found</p>
        </div>}
      
    </div>
  )
}

export default Home