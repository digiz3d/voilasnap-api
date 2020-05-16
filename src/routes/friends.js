import express from 'express'

import getFriend from '../controllers/get-friend'
import getFriends from '../controllers/get-friends'

const router = express.Router()

router.get('/:userId', getFriend)
router.get('/', getFriends)

export default router
