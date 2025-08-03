const createError = require("../create_error")
const jsonwebtoken = require("jsonwebtoken")
const User = require("../models/user")

function userAuthrise(...roles){
    return function(req, res, next){
       if (roles.includes(req.user?.role)){
        next()
       } else {
        createError("not authorised", 403)
            return
       }
    }
}

async function userAuth(req, res, next){
     const {token} = req.cookies

     
        
        if (!token){
            createError("token not provided", 400)
            return
        }

        const decoded =  jsonwebtoken.verify(token, process.env.JWT_SECRET)

        const theUser = await User.findOne({_id: decoded?._id})

        if (theUser){
            req.user = theUser
            next()
        } else {
            createError("error in decoding token", 401)
            return
        }
}

module.exports = {userAuthrise, userAuth}