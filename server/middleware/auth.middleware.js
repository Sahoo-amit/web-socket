import { User } from "../models/user.model.js";
import jwt from 'jsonwebtoken'

export const auth = async(req,res,next) =>{
    try {
        const token = req.headers.authorization?.replace("Bearer ","").trim()
        if(!token){
            return res.status(404).json({msg:"Token not found."})
        }
        const isVerified = jwt.verify(token, process.env.JWT_SECRET)
        if(!isVerified){
            return res.status(401).json({msg:"Not authorized."})
        }
        req.user = await User.findOne({username: isVerified.username}).select('-password')
        next()
    } catch (error) {
        console.log(error)
    }
}