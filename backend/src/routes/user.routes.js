const express = require("express")
const {register,login, logout,checkAuth} = require("../controllers/user.controllers.js")
const isAuth = require("../middleware/isAuth.js")
const userRouter = express.Router()

userRouter.post("/register",register)
userRouter.post("/login",login)
userRouter.post("/logout",isAuth,logout)
userRouter.get("/check",checkAuth)
module.exports = userRouter