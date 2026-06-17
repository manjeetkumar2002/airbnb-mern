import React, { useContext } from 'react'
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import {z} from "zod"
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { listingContext } from '../context/ListingContext';

import {listingpage1schema} from "../schemas/listingpage1.js"

const amenitiesList = [
  "Wifi",
  "Pool",
  "Parking",
  "Kitchen",
  "TV",
  "AC",
];
const ListingPage1 = () => {
    const navigate = useNavigate()
    const {listingFormData,setListingFormData} = useContext(listingContext)
    const {register,handleSubmit,setValue,formState: { errors }} = useForm({resolver:zodResolver(listingpage1schema)});
    async function onSubmit(data){
        setListingFormData((prev)=>({
            ...prev,
            ...data
        }))
        console.log("click page1")
        navigate("/listingpage2")
    }
  return (
    <div className='h-screen'>
        <div className='flex justify-between py-4 px-4'>
            <div onClick={()=>navigate("/")} className=' p-4 rounded-full bg-secondary cursor-pointer'>
            <FaArrowLeft />
            </div>
            <div>
                <button className='btn btn-secondary rounded-full'>SetUp Your Home</button>
            </div>
        </div>
        {/* form  */}
        <form onSubmit={handleSubmit(onSubmit)} className='mx-auto max-w-[800px] w-full flex flex-col gap-[20px] overflow-y-auto h-[80%] px-5'>
            <div className='form-control flex flex-col gap-[10px]'>
                <label className='label'>
                    <span className='label-text'>Title</span>
                </label>
                <input {...register("title")} className='input w-full' type="text"/>
                {errors.title && (
                <p className="text-red-500">{errors.title.message}</p>
                )}
            </div>
            <div className='form-control flex flex-col gap-[10px]'>
                <label className='label'>
                    <span className='label-text'>Description</span>
                </label>
                <input {...register("description")} className='input w-full' type="text"/>
                {errors.description && (
                <p className="text-red-500">{errors.description.message}</p>
                )}
            </div>
            <div className='form-control flex flex-col gap-[10px]'>
                <label className='label'>
                    <span className='label-text'>Price Per Night</span>
                </label>
                <input {...register("pricePerNight")} className='input w-full' type="number"/>
                {errors.pricePerNight && (
                <p className="text-red-500">{errors.pricePerNight.message}</p>
                )}
            </div>
            <div className='form-control flex flex-col gap-[10px]'>
                <label className='label'>
                    <span className='label-text'>No. Of BedRooms</span>
                </label>
                <input {...register("bedrooms")} className='input w-full' type="number"/>
                {errors.bedrooms && (
                <p className="text-red-500">{errors.bedrooms.message}</p>
                )}
            </div>
            <div className='form-control flex flex-col gap-[10px]'>
                <label className='label'>
                    <span className='label-text'>No. Of Bathrooms</span>
                </label>
                <input {...register("bathrooms")} className='input w-full' type="number"/>
                {errors.bathrooms && (
                <p className="text-red-500">{errors.bathrooms.message}</p>
                )}
            </div>
            <div className='form-control flex flex-col gap-[10px]'>
                <label className='label'>
                    <span className='label-text'>Location</span>
                </label>
                <input {...register("location")} className='input w-full' type="text"/>
                {errors.location && (
                <p className="text-red-500">{errors.location.message}</p>
                )}
            </div>
            <div className='form-control flex flex-col gap-[10px]'>
                <label className='label'>
                    <span className='label-text'>City</span>
                </label>
                <input {...register("city")} className='input w-full' type="text"/>
                {errors.city && (
                <p className="text-red-500">{errors.city.message}</p>
                )}
            </div>
            <div className='form-control flex flex-col gap-[10px]'>
                <label className='label'>
                    <span className='label-text'>Country</span>
                </label>
                <input {...register("country")} className='input w-full' type="text"/>
                {errors.country && (
                <p className="text-red-500">{errors.country.message}</p>
                )}
            </div>
            <div className='form-control flex flex-col gap-[10px]'>
                <label className='label'>
                    <span className='label-text'>Images (4 images only)</span>
                </label>
                <input
                className='input w-full'
                type="file"
                multiple
                accept="image/*"
                onChange={(e) => {
                    const files = Array.from(e.target.files);
                    setValue("images", files, {
                    shouldValidate: true,
                    });
                }}
                />

                {errors.images && (
                <p className="text-red-500">{errors.images.message}</p>
                )}
            </div>
            <div className='form-control flex gap-[10px]'>
                <label className='label'>
                    <span className='label-text'>Amenitites :</span>
                </label>
                {amenitiesList.map((item) => (
            <label key={item} className="flex gap-2">
                <input
                type="checkbox"
                value={item}
                {...register("amenities")}
                />
                {item}
            </label>
            ))}
            </div>
            
            {/* submit btn */}
            <div>
                <button type='submit' className='btn btn-secondary max-w-[200px] w-full'>Next</button>
            </div>
        </form>
    </div>
  )
}

export default ListingPage1