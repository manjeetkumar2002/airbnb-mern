import { createContext, useState ,useEffect, useContext } from "react"
import axiosClient from "../utils/axiosClient.js"
import { userContext } from "./UserContext"
export const bookingContext = createContext()

const BookingContextProvider = ({children})=>{
    const [booking,setBooking] = useState([])
    const {userData} = useContext(userContext)
    const fetchAllBooking = async()=>{
        try {
        const result = await axiosClient.get("/booking/my-bookings")
        console.log("bookings :",result.data)
        setBooking(result.data)
        
        } catch (error) {
        console.log(error);
        }
    }
    useEffect(()=>{
        if(userData)
        fetchAllBooking()
  },[userData])
    return (
        <bookingContext.Provider value={{booking,setBooking,fetchAllBooking}}>{children}</bookingContext.Provider>
    )
}

export default BookingContextProvider