import express from 'express'

import searchUsers from '../controllers/search-users'
import sendMessage from '../controllers/send-message'
import addFriend from '../controllers/add-friend'

const router = express.Router()

router.post('/search', searchUsers)
router.post('/:userId/message', sendMessage)
router.post('/:userId/add-friend', addFriend)

export default router
