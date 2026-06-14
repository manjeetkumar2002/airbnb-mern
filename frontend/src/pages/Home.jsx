import React, { useContext, useEffect } from 'react'
import Nav from '../component/Nav'
import { listingContext } from '../context/ListingContext'
import Card from '../component/Card.jsx'
import ListingFilters from '../component/ListingFilters.jsx'
const Home = () => {
  const {allListing} = useContext(listingContext)
  console.log(allListing)
  return (
    <div className='max-w-[1280px] mx-auto'>
      <Nav/>
      <ListingFilters/>
      {/* listing cards */}
      <div className='mt-[30px]'>
        {
          allListing?.map((listing)=>
            <Card title={listing.title} images={listing.images} description={listing.description} pricePerNight={listing.pricePerNight}/>
          )
        }
      </div>
    </div>
  )
}

export default Home