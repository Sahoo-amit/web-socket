import mongoose from 'mongoose'
import jwt from 'jsonwebtoken'

const userSchema = new mongoose.Schema({
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true}
})

userSchema.methods.generateToken = async function(){
    try {
        return jwt.sign({
            username: this.username
        }, process.env.JWT_SECRET,{expiresIn: '3h'})
    } catch (error) {
        console.log(error)
    }
}

export const User = mongoose.model("User", userSchema)