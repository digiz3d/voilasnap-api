import express from 'express'
import multer from 'multer'

const storage = multer.memoryStorage()
const upload = multer({ storage })

import searchUsers from '../controllers/search-users'
import sendMessage from '../controllers/send-message'
import addFriend from '../controllers/add-friend'

const router = express.Router()

router.post('/search', searchUsers)
router.post('/:userId/message', upload.single('snap'), sendMessage)
router.post('/:userId/add-friend', addFriend)

export default router
