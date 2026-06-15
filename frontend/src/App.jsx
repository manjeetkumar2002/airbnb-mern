import {Routes,Route, useNavigate, Navigate} from "react-router-dom"
import Home from "./pages/Home"
import SignUp from "./pages/SignUp"
import Login from "./pages/Login"
import "./App.css"
import { useContext } from "react"
import { userContext } from "./context/UserContext"
import { useEffect } from "react"
import ViewCard from "./component/ViewCard"
import ListingPage1 from "./pages/ListingPage1"

function App() {
  const {userData} = useContext(userContext)
  const {checkAuth} = useContext(userContext)
    useEffect(()=>{
      checkAuth()
    },[])
  return (
    <Routes>
      <Route path="/" element={userData?<Home/>:<Navigate to="/login"/>}></Route>
      <Route path="/signup" element={userData? <Navigate to="/"/>:<SignUp/>}></Route>
      <Route path="/login" element={userData?<Navigate to="/"/>:<Login/>}></Route>
      <Route path="/listing/:id" element={userData?<ViewCard/>:<Navigate to="/login"/>}></Route>
      <Route path="/listingpage1" element={userData?<ListingPage1/>:<Navigate to="/login"/>}></Route>
    </Routes>
  )
}

export default App
