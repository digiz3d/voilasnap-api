import express from 'express'

import readMessage from '../controllers/read-message'

const router = express.Router()

router.get('/:messageId', readMessage)

export default router
