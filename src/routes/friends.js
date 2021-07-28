import express from 'express'

import addFriend from '../controllers/add-friend'
import getFriend from '../controllers/get-friend'
import getFriends from '../controllers/get-friends'
import unfriend from '../controllers/unfriend'

const router = express.Router()

router.delete('/:userId', unfriend)
router.get('/:userId', getFriend)
router.get('/', getFriends)
router.put('/:userId', addFriend)

export default router
