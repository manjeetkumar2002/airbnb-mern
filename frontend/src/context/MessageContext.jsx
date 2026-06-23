import { createContext, useState } from "react";

export const MessageContext = createContext()

const MessageContextProvider = ({children})=>{
    let [message,setMessage] = useState(null)
    const showMessage=(content,success)=>{
        setMessage({content:content,success:success})
        setTimeout(()=>{
            setMessage(null)
        },3000)
    }
    return (
        <MessageContext.Provider value={{message,showMessage,setMessage}}>{children}</MessageContext.Provider>
    )
}

export default MessageContextProvider