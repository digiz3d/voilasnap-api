import express from 'express'

import listMessages from '../controllers/list-messages'
import readMessage from '../controllers/read-message'

const router = express.Router()

router.get('/', listMessages)
router.get('/:messageId', readMessage)

export default router
