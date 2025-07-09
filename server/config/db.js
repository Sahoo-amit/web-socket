import mongoose, { mongo } from 'mongoose'

export const connectDB = async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log(`Database connected.`)
    } catch (error) {
        console.log(error)
        console.log(`Database not connected.`)
    }
}