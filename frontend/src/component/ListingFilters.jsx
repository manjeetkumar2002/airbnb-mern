import React, { useContext } from 'react'
import { GiFamilyHouse } from "react-icons/gi";
import { GrSwim } from "react-icons/gr";
import { MdApartment } from "react-icons/md";
import { GiShop } from "react-icons/gi";
import { GiWoodCabin } from "react-icons/gi";
import { LuBedDouble } from "react-icons/lu";
import { IoBed } from "react-icons/io5";
import { FaTreeCity } from "react-icons/fa6";
import { FaFire } from "react-icons/fa";
import { listingContext } from '../context/ListingContext';
const Filters = [
    {
        icon:FaFire,
        name:"Trending"
    },
    {
        icon:GiFamilyHouse,
        name:"Villa"
    },
    {
        icon:FaTreeCity,
        name:"Farm House"
    },
    {
        icon:GrSwim,
        name:"Pool House"
    },
    {
        icon:IoBed,
        name:"Rooms"
    },
    {
        icon:MdApartment,
        name:"Flat"
    },
    {
        icon:LuBedDouble,
        name:"PG"
    },
    {
        icon:GiWoodCabin,
        name:"Cabin"
    },
     {
        icon:GiShop,
        name:"Shop"
    },
]
const ListingFilters = () => {
    const {filteredListing,setFilteredListing,allListing} = useContext(listingContext)
    console.log(allListing)
    const applyFilter =(filter)=>{
        if(filter == "Trending"){
            setFilteredListing([...allListing])
            return  
        }
        console.log("filter click")
        const filterData = allListing.filter((listing)=>listing?.category?.toLowerCase() === filter?.toLowerCase())
        console.log(filterData)
        setFilteredListing([...filterData])
    }
  return (
    <div className='flex justify-center items-center flex-wrap gap-6 py-4'>
        {
            Filters.map(({icon:Icon,name},index)=>(
                <div onClick={()=>applyFilter(name)} key={index} className='min-w-[70px] cursor-pointer flex flex-col items-center'>
                    <Icon  className='text-3xl'/>
                    <span className='text-[16px]'>{name}</span>
                </div>
            ))
        }
    </div>
  )
}

export default ListingFilters