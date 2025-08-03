const mongoose = require("mongoose")
const validate = require("validator")
const bcrypt = require("bcrypt")
const jsonwebtoken = require("jsonwebtoken")
const createError = require("../create_error")

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        minLength: [2, "minimum length of name is 2"],
        maxLength: [10, "maximum length of name is 10"]
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: function (email){
            if (!validate.isEmail(email)){
                createError(`${email} is not valid`)
            }
        }
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true,
        enum: {
            values : ["user", "admin"],
            message : "role not supported"
        }
    },
    authenticated: {
        type: Boolean,
        required: true
    }
}, {timestamps: true})

UserSchema.methods.comparePassword = async function(password){
    return  bcrypt.compare(password, this.password)
}

UserSchema.methods.createJwt = function(){
    return jsonwebtoken.sign({_id: this._id, role: this.role}, process.env.JWT_SECRET, {expiresIn: 1000*60*60*24})
}

const User = mongoose.model("User", UserSchema)

module.exports = User