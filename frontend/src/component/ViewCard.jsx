import React, { useContext, useEffect ,useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axiosClient from '../utils/axiosClient'
import { FaArrowLeft } from "react-icons/fa";
import { userContext } from '../context/UserContext';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {listingpage1schema} from "../schemas/listingpage1.js"
import {z} from "zod"
import { listingContext } from '../context/ListingContext.jsx';
const schema = z.object({
  title: z.string().min(3, "Title is required"),
  description: z.string().min(10, "Description is required"),

  pricePerNight: z.coerce.number(),

  city: z.string(),
  country: z.string(),
  location: z.string(),

  amenities: z.array(z.string()),

  bedrooms: z.coerce.number(),
  bathrooms: z.coerce.number(),
  images: z
    .array(z.instanceof(File))
    .min(4, "Upload exactly 4 images")
    .max(4, "Upload exactly 4 images").optional(),
});
const ViewCard = () => {
  const {id} = useParams()
  const [listing,setListing] = useState(null)
  const navigate = useNavigate()
  const {userData} = useContext(userContext)
  const [edit,setEdit] = useState(false)
      const {register,handleSubmit,setValue,reset,formState: { errors }} = useForm({resolver:zodResolver(schema)});
      const {fetchAllListing} = useContext(listingContext)
  const amenitiesList = [
  "Wifi",
  "Pool",
  "Parking",
  "Kitchen",
  "TV",
  "AC",
];
  async function fetchListing() {
    try {
        const result = await axiosClient.get(`/listing/get/${id}`)
        console.log(result.data)
        setListing(result.data)
    } catch (error) {
        console.log(error)
    }
  }
  async function deleteListing() {
    try {
        const result = await axiosClient.delete(`/listing/delete/${id}`)
        console.log(result.data)
        navigate("/")
        fetchAllListing()
    } catch (error) {
        console.log(error)
    }
  }
  async function updateListing(data) {
  try {
    const formData = new FormData();

    Object.keys(data).forEach((key) => {
      if (key === "images") {
        data.images?.forEach((file) => {
          formData.append("images", file);
        });
      } else if (Array.isArray(data[key])) {
        data[key].forEach((item) => {
          formData.append(key, item);
        });
      } else {
        formData.append(key, data[key]);
      }
    });
    const result = await axiosClient.patch(
      `/listing/update/${id}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    navigate("/")
    fetchAllListing()
    console.log(result.data);
  } catch (error) {
    console.log(error);
  }
}
  useEffect(()=>{
    fetchListing()
  },[userData])
  useEffect(() => {
  if (listing) {
    reset({
      title: listing.title,
      description: listing.description,
      pricePerNight: listing.pricePerNight,
      bedrooms: listing.bedrooms,
      bathrooms: listing.bathrooms,
      location: listing.location,
      city: listing.city,
      country: listing.country,
      amenities: listing.amenities
    });
  }
}, [listing, reset]);
  return (
    <div className='max-w-[1280px] mx-auto h-screen '>
        <div onClick={()=>navigate("/")} className='fixed top-3 left-3 p-4 rounded-full bg-secondary cursor-pointer'>
            <FaArrowLeft />
        </div>
        <div className='py-6'>
            <h3 className='text-4xl'>{listing?.title}</h3>
        </div>
        <div className='flex h-[60%] mb-4'>
            <div className='w-[60%]'><img className='h-full w-full' src={listing?.images[0]} alt="" /></div>
            <div className='w-[40%]'>
            <div className='h-[50%]'><img className='h-full w-full' src={listing?.images[1]} alt="" /></div>
            <div className='h-[50%]'><img  className='h-full w-full'src={listing?.images[2]} alt="" /></div>
            </div>
        </div>
        <div>
            <p className='text-2xl mb-3'>{listing?.description}</p>
        </div>
        <div>
            <p className='text-2xl mb-3'>₹{listing?.pricePerNight}/day</p>
        </div>
        <div>
            <button onClick={()=>setEdit(!edit)}  className='btn btn-secondary max-w-[200px] mt-[20px] w-full'>{userData?._id === listing?.host ?"Edit Listing":"Reserve"}</button>
        </div>
        {/* edit listing popup */}
        {edit &&  <div className='z-100 fixed top-0 left-0 right-0 h-screen bg-black opacity-70'> 
            
        </div>}
        {
            edit && <div className='flex justify-center items-start fixed left-0 top-[20px] w-full z-200'>
                <form onSubmit={handleSubmit(updateListing)} className='mx-auto max-w-[800px] w-full flex flex-col h-screen pb-[50px] bg-black z-200 gap-[20px] overflow-y-auto p-5'>
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
            <div className='flex justify-between items-center gap-[20px]'>
                <button type='submit' className='btn btn-secondary max-w-[48%] w-full'>Update Listing</button>
                <button  type="button"
  onClick={deleteListing} className='btn btn-secondary max-w-[48%] w-full'>Delete Listing</button>
            </div>
        </form>
            </div>
            
        }
       
    </div>
  )
}

export default ViewCard