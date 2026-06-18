import React, { useContext, useState, useEffect } from "react";
import logo from "../assets/logo.png";
import { CiSearch } from "react-icons/ci";
import { MdMenu } from "react-icons/md";
import { NavLink } from "react-router-dom";
import { RxCross2 } from "react-icons/rx";
import { MessageContext } from "../context/MessageContext";
import axiosClient from "../utils/axiosClient";
import { userContext } from "../context/UserContext";
const Nav = () => {
  const [showMenu, setShowMenu] = useState(false);
  const { message, showMessage, setMessage } = useContext(MessageContext);
  const [progress, setProgress] = useState(100);
  const { setUserData } = useContext(userContext);
  async function handleLogout() {
    try {
      const result = await axiosClient.post("/user/logout");
      setUserData(null);
    } catch (error) {}
  }
  useEffect(() => {
    if (!message) return;

    setProgress(100);

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 30);

    return () => clearInterval(interval);
  }, [message]);
  return (
    <div className="min-h-[120px] flex flex-wrap items-center justify-between px-3 border-b">
      {/* logo */}
      <div className="w-[130px] h-[120px] overflow-hidden object-center order-1">
        <img className="h-full w-full" src={logo} alt="" />
      </div>
      {/* search */}
      <div className="relative md:top-0 top-[-20px] border p-3 rounded-3xl w-full order-3 md:order-2 md:max-w-[500px]">
        <input
          className="w-[70%] outline-none border-0"
          type="text"
          placeholder="Any Where | Any Location | Any City"
        />
        <div className="flex justify-center items-center absolute top-1 right-1 rounded-full p-2 bg-secondary text-white text-2xl">
          <CiSearch />
        </div>
      </div>
      {/* humburger */}
      <div className="relative flex items-center gap-[20px] order-2 md:order-3">
        <NavLink to="listingpage1" className="lg:block hidden text-[18px]">
          List your home
        </NavLink>
        <div
          onClick={() => setShowMenu(!showMenu)}
          className="flex gap-[10px] items-center justify-center border-1 px-4  py-2 rounded-3xl cursor-pointer"
        >
          <MdMenu className="text-xl" />
          <span className="text-[16px] px-1 border-1 rounded-full">M</span>
        </div>
        {/* menu */}
        <div
          className={`${showMenu ? "flex" : "hidden"} min-w-[200px] border-1 absolute top-[50px] right-5 bg-base-100 rounded-md p-5 px-0 z-10 flex-col gap-[10px]`}
        >
          <div className="pb-2  px-5 w-full border-b-1">
            <NavLink>Login</NavLink>
          </div>
          <div className="pb-2 px-5  w-full ">
            <NavLink>List your Home</NavLink>
          </div>
          <div className="pb-2 px-5  w-full ">
            <NavLink to="/mylisting">My Listing</NavLink>
          </div>
          <div className="pb-2 px-5  w-full ">
            <NavLink to="/mybooking">My Booking</NavLink>
          </div>
          <div onClick={handleLogout} className="pb-2 px-5  w-full ">
            <NavLink>Logout</NavLink>
          </div>
        </div>
      </div>
      {/* message popup */}
      <div
        className={`${message ? "block" : "hidden"} max-w-[300px] w-full z-100 bg-white text-success rounded-md fixed top-5 right-5 p-5`}
      >
        Message : {message}
        <RxCross2
          onClick={() => setMessage(null)}
          className="text-2xl text-black absolute right-1 top-1 "
        />
        {/* Progress Bar */}
        <progress
          className="progress h-2 right-0 left-0 absolute bottom-0 progress-success w-full rounded-0"
          value={progress}
          max="100"
        ></progress>
      </div>
    </div>
  );
};

export default Nav;
