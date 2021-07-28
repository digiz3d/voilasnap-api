import express from 'express'

import multer from 'multer'

const storage = multer.memoryStorage()
const upload = multer({ storage })

import listMessages from '../controllers/list-messages'
import readMessage from '../controllers/read-message'
import sendMessage from '../controllers/send-message'

const router = express.Router()

router.get('/', listMessages)
router.get('/:messageId', readMessage)
router.post('/', upload.single('snap'), sendMessage)

export default router
