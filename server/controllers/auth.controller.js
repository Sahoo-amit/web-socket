import { User } from "../models/user.model.js";
import bcrypt from 'bcryptjs'

export const register = async(req,res)=>{
    const {username,password} = req.body
    try {
        const userExist = await User.findOne({username})
        if(userExist){
            return res.status(409).json({msg:"User already exist with this username."})
        }
        const hash_pass = await bcrypt.hash(password,10)
        const user = await User.create({username, password:hash_pass})
        res.status(201).json({msg:"User created successfully.", token: await user.generateToken(), user})
    } catch (error) {
        console.log(error)
    }
}

export const login = async(req,res) =>{
    const {username, password} = req.body
    try {
        const userExist = await User.findOne({username})
        if(!userExist){
            return res.status(404).json({msg:'User not found.'})
        }
        const isMatched = await bcrypt.compare(password, userExist.password);
        if(!isMatched){
            return res.status(400).json({msg:"Invalid credentials."})
        }
        res.status(200).json({msg:"Login success.", token: await userExist.generateToken(), userExist})
    } catch (error) {
        console.log(error)
    }
}