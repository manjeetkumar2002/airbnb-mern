import React, { useContext, useEffect ,useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axiosClient from '../utils/axiosClient'
import { FaArrowLeft } from "react-icons/fa";
import { userContext } from '../context/UserContext';

const ViewCard = () => {
  const {id} = useParams()
  const [listing,setListing] = useState(null)
  const navigate = useNavigate()
  const {userData} = useContext(userContext)
  async function fetchListing() {
    try {
        const result = await axiosClient.get(`/listing/get/${id}`)
        console.log(result.data)
        setListing(result.data)
    } catch (error) {
        console.log(error)
    }
  }
  useEffect(()=>{
    fetchListing()
  },[userData])
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
            <button className='btn btn-secondary max-w-[200px] mt-[20px] w-full'>{userData?._id === listing?.host ?"Edit Listing":"Reserve"}</button>
        </div>
    </div>
  )
}

export default ViewCard