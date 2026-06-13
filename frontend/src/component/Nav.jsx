import React,{useState} from 'react'
import logo from "../assets/logo.png"
import { CiSearch } from "react-icons/ci";
import { MdMenu } from "react-icons/md";
import {NavLink} from "react-router-dom"
const Nav = () => {
    const [showMenu,setShowMenu] = useState(false)
    return (
    <div className='h-[120px] flex items-center justify-between px-3 py-0 border-b-1'>
        {/* logo */}
        <div className='w-[130px] h-[120px]'>
            <img className="h-full w-full" src={logo} alt="" />
        </div>
        {/* search */}
        <div className='relative border-1 p-3 rounded-3xl max-w-[500px] w-full'>
            <input className='w-[70%] outline-0 border-0' type="text" placeholder='Any Where | Any Location | Any City' />
            <div className='flex justify-center items-center absolute top-1 right-1 rounded-full p-2 bg-secondary text-white text-2xl'>
                <CiSearch />
            </div>
        </div>
        {/* humburger */}
        <div className='relative flex items-center gap-[20px]'>
            <NavLink className='text-[18px]'>List your home</NavLink>
            <div onClick={()=>setShowMenu(!showMenu)} className='flex gap-[10px] items-center justify-center border-1 px-4  py-2 rounded-3xl cursor-pointer'>
                <MdMenu className='text-xl' />
                <span className='text-[16px] px-1 border-1 rounded-full'>M</span>
            </div>
            {/* menu */}
            <div className={`${showMenu?"flex":"hidden"} border-1 absolute top-[50px] right-5 bg-base-100 rounded-md p-5 px-0 z-10 flex-col gap-[10px]`}>
                <div className='pb-2  px-5 w-full border-b-1'>
                    <NavLink>Login</NavLink>
                </div>
                <div className='pb-2 px-5  w-full '>
                    <NavLink>List your Home</NavLink>
                </div>
                <div className='pb-2 px-5  w-full '>
                    <NavLink>My Listing</NavLink>
                </div>
                <div className='pb-2 px-5  w-full '>
                    <NavLink>My Booking</NavLink>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Nav