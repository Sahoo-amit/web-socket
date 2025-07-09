import { User } from "../models/user.model.js";

export const getAllUsers = async(req,res)=>{
    try {
        const id = req.user.id
        const users = await User.find({_id: {$ne: id}}).select("-password")
        res.status(200).json(users)
    } catch (error) {
        console.log(error)
    }
}