import express from 'express'

import getFriend from '../controllers/get-friend'
import getFriends from '../controllers/get-friends'
import addFriend from '../controllers/add-friend'
import unfriend from '../controllers/unfriend'

const router = express.Router()

router.get('/:userId', getFriend)
router.get('/', getFriends)
router.put('/:userId', addFriend)
router.delete('/:userId', unfriend)

export default router
