import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import {BrowserRouter} from "react-router-dom"
import MessageProvider from './context/MessageContext.jsx'
import "./App.css"
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <MessageProvider>
    <BrowserRouter>
    <App />
    </BrowserRouter>
    </MessageProvider>
  </StrictMode>
)
