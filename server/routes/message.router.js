import express from 'express'
import { getMessages, sendMessage } from '../controllers/message.controller.js'
import { auth } from '../middleware/auth.middleware.js'

const router = express.Router()

router.get('/:id', auth, getMessages)
router.post('/send', auth, sendMessage)

export default router