import { createContext, useContext, useEffect ,useState } from "react";
import axiosClient from "../utils/axiosClient";
import { userContext } from "./UserContext";

export const listingContext = createContext()

const ListingContextProvider = ({children})=>{
    const [allListing,setAllListing] = useState([])
    const [filteredListing,setFilteredListing] = useState([])
    const {userData} = useContext(userContext)
    const [listingFormData,setListingFormData] = useState(null)
    const fetchAllListing = async()=>{
        try {
            const result =await axiosClient.get("/listing/get/all")
            // console.log(result.data)
            setAllListing([...result.data])
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(()=>{
        if(userData)
        fetchAllListing()
    },[userData])
    return (
        <listingContext.Provider value={{allListing,setAllListing,filteredListing,setFilteredListing,listingFormData,setListingFormData}}>{children}</listingContext.Provider>
    )
}

export default ListingContextProvider