import React, { useContext } from 'react'
import { listingContext } from '../context/ListingContext'

const ListingPage3 = () => {
    const {listingFormData,setListingFormData} = useContext(listingContext)
    console.log(listingFormData)
  return (
    <div>ListingPage3</div>
  )
}

export default ListingPage3