import express from 'express'
import http from 'http'
import { Server } from 'socket.io'
import cors from 'cors'
import { config } from 'dotenv'
import { connectDB } from './config/db.js'
import authRouter from './routes/auth.router.js'
import userRouter from './routes/user.router.js'
import messageRoute from './routes/message.router.js'
config()

const app = express()
app.use(express.json())
app.use(cors({
    origin: process.env.FRONTEND_URL,
    methods: ["POST","GET","PUT","DELETE"],
    credentials: true
}))
app.options("*", cors()); 

app.use('/api/user',userRouter)
app.use('/api/auth',authRouter)
app.use('/api/message',messageRoute)

const server = http.createServer(app)
const io = new Server(server, {
    cors: {origin: process.env.FRONTEND_URL}
})

io.on('connection', socket =>{
    socket.on('join', userId =>{
        socket.join(userId)
    })
    socket.on('send_message', ({sender,receiver, content})=>{
        io.to(receiver).emit('receive_message', {sender, content})
    })
    socket.on('disconnect',()=>{
        console.log(`User disconnected.`)
    })
})

connectDB()
const port = process.env.PORT || 4000
server.listen(port, ()=>console.log(`Server is listening at port ${port}`))