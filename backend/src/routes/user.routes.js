const express = require("express")
const {register,login, logout} = require("../controllers/user.controllers.js")
const isAuth = require("../middleware/isAuth.js")
const userRouter = express.Router()

userRouter.post("/register",register)
userRouter.post("/login",login)
userRouter.post("/logout",isAuth,logout)

module.exports = userRouter