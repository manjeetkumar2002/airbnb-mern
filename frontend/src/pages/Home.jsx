import React, { useContext, useEffect } from 'react'
import Nav from '../component/Nav'
import { listingContext } from '../context/ListingContext'
import Card from '../component/Card.jsx'
import ListingFilters from '../component/ListingFilters.jsx'
import { useNavigate } from 'react-router-dom'
const Home = () => {
  const {allListing} = useContext(listingContext)
  console.log(allListing)
  const navigate = useNavigate()
  return (
    <div className='max-w-[1280px] mx-auto'>
      <Nav/>
      <ListingFilters/>
      {/* listing cards */}
      <div className='mt-[30px]'>
        {
          allListing?.map((listing,index)=>
            <Card key={index}  id={listing._id} title={listing.title} images={listing.images} description={listing.description} pricePerNight={listing.pricePerNight}/>
          )
        }
      </div>
    </div>
  )
}

export default Home