const createError = require("../create_error")
const User = require("../models/user")
const bcrypt = require("bcrypt")

const register = async (req, res) => {
    const {name, email, password} = req.body

    if (password.length < 6){
        createError("password length must be >= 6", 400)
        return
    }

    const hash = await bcrypt.hash(password, 10)

    let role = "user"

    const userCount = await User.countDocuments()

    if (userCount === 0){
        role = "admin"
    }

    const theUser = User({
        name,
        email,
        password: hash,
        role,
        authenticated: role === "admin",
    })

    await theUser.save()

    res.status(201).json({msg: theUser.role === "admin" ? "admin created" : "user created and request sent for approval"})
}

const login = async (req, res) => {
    const {email, password} = req.body

    let theUser = await User.findOne({email})
    if (!theUser){
        createError("invalid email", 404)
        return
    }

    const isPasswordMatched = await theUser.comparePassword(password)

    if (!isPasswordMatched){
        createError("invalid password", 401)
        return
    }

    if (!theUser.authenticated){
        createError("authentication pending", 403)
        return
    }

    const token = theUser.createJwt()

    res.cookie("token", token, { expires: new Date(Date.now() + 1000*60*60*24), httpOnly: true})

    theUser = theUser.toObject()

    delete theUser.password

    res.status(200).json({theUser})
}

const logout = async (req, res) => {
    res.cookie("token", null, { expires: new Date(Date.now()), httpOnly: true})

    res.status(200).json({msg: "user logged out"})
}

const authenticateUser = async (req, res) => {
    const {userId, permission} = req.body

    const updatedUser = await User.findOneAndUpdate({_id: userId}, {authenticated: permission}, {new: true})

    if (!updatedUser){
        createError("invalid user", 400)
        return
    }

    res.status(200).json({msg: "user authentication updated"})
}

const getAuthenticateUsers = async (req, res) => {
    let authenticatedUsers = await User.find({authenticated : true, role: "user"}).lean()

    authenticatedUsers = authenticatedUsers.map(user => {
        delete user.password
        return user
    })

    res.status(200).json({authenticatedUsers})
}

const getUserRequests = async (req, res) => {
    let userRequests = await User.find({authenticated : false}).lean()

    userRequests = userRequests.map(user => {
        delete user.password
        return user
    })

    res.status(200).json({userRequests})
}

module.exports = {register, login, logout, authenticateUser, getAuthenticateUsers, getUserRequests}