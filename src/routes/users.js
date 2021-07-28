import express from 'express'

import searchUsers from '../controllers/search-users'

const router = express.Router()

router.post('/search', searchUsers)

export default router
