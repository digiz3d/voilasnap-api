import express from 'express'

import sendMessage from '../controllers/send-message'

const router = express.Router()

router.post('/:userId/message', sendMessage)

router.get('/:')

export default router
