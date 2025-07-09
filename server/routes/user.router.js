import express from 'express'
import { getAllUsers } from '../controllers/user.controller.js'
import { auth } from '../middleware/auth.middleware.js'

const router = express.Router()

router.get('/:id', auth, getAllUsers)

export default router