const express = require("express")
const {register, login, logout, authenticateUser, getAuthenticateUsers, getUserRequests} = require("../controllers/user")
const { userAuth, userAuthrise } = require("../middlewares/userAuth")
const userRouter = express.Router()

userRouter.post("/register", register)
userRouter.post("/login", login)
userRouter.post("/logout", userAuth, logout)
userRouter.patch("/authenticate", userAuth, userAuthrise("admin"), authenticateUser)
userRouter.get("/getauthenticateduser", userAuth, userAuthrise("admin"), getAuthenticateUsers)
userRouter.get("/getuserrequest", userAuth, userAuthrise("admin"), getUserRequests)

module.exports = userRouter