const express = require("express")
const dotenv = require("dotenv")
const cors = require("cors")
dotenv.config()
const PORT = process.env.PORT
const app = express()
const userRouter = require("./src/routes/user.routes")
const main = require("./src/config/db.js")
const redisClient = require("./src/config/redis.js")
const cookieParser = require("cookie-parser")
const listingRouter = require("./src/routes/listing.routes.js")
const bookingRouter = require("./src/routes/booking.routes.js")
const reviewRouter = require("./src/routes/review.routes.js")
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));
app.use(express.json())
app.use(cookieParser())
app.use("/user",userRouter)
app.use("/listing",listingRouter)
app.use("/booking",bookingRouter)
app.use("/review",reviewRouter)
const initializeConnection = async()=>{
    try{
        await Promise.all([redisClient.connect(),main()])
        console.log("DB Connected")
        app.listen(PORT ,()=>{
            console.log(`Listening at PORT :${PORT}`)
        })  
    }
    catch(error){
        console.log(error)
    }
   
}

initializeConnection()