import { createContext, useState } from "react";

export const MessageContext = createContext()

const MessageProvider = ({children})=>{
    const [message,setMessage] = useState(null)
    const showMessage=(content,type="success")=>{
        setMessage(content)
        setTimeout(()=>{
            setMessage(null)
        },3000)
    }
    return (
        <MessageContext.Provider value={{message,showMessage,setMessage}}>{children}</MessageContext.Provider>
    )
}

export default MessageProvider