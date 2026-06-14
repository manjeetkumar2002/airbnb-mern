import { createContext, useState } from "react";
import axiosClient from "../utils/axiosClient";
import { useNavigate } from "react-router-dom";

export const userContext = createContext()

const UserContextProvider = ({children})=>{
    const [userData,setUserData] = useState(null)
    console.log(userData)
    async function checkAuth(){
        try {
            const result = await axiosClient.get("/user/check")
            console.log(result.data)
            setUserData(result.data)
        } catch (error) {
            setUserData(null)
            console.log(error)
        }
    }
    return (
        <userContext.Provider value={{userData,setUserData,checkAuth}}>{children}</userContext.Provider>
    )
}

export default UserContextProvider