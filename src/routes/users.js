import express from 'express'

import searchUsers from '../controllers/search-users'
import sendMessage from '../controllers/send-message'

const router = express.Router()

router.post('/search', searchUsers)
router.post('/:userId/message', sendMessage)

export default router
