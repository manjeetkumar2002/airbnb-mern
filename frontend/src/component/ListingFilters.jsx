import React from 'react'
import { GiFamilyHouse } from "react-icons/gi";
import { GrSwim } from "react-icons/gr";
import { MdApartment } from "react-icons/md";
import { GiShop } from "react-icons/gi";
import { GiWoodCabin } from "react-icons/gi";
import { LuBedDouble } from "react-icons/lu";
import { IoBed } from "react-icons/io5";
import { FaTreeCity } from "react-icons/fa6";
import { FaFire } from "react-icons/fa";

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
  return (
    <div className='flex justify-center items-center gap-6 py-4'>
        {
            Filters.map(({icon:Icon,name},index)=>(
                <div key={index} className='flex flex-col items-center'>
                    <Icon className='text-3xl'/>
                    <span className='text-[16px]'>{name}</span>
                </div>
            ))
        }
    </div>
  )
}

export default ListingFilters