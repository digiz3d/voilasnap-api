import express from 'express'

import AuthMiddleware from '../middleware/auth'
import User from '../models/User'

import userSignup from '../controllers/user-signup'
import userSignin from '../controllers/user-signin'

const router = express.Router()

router.post('/signup', userSignup)

router.post('/signin', userSignin)

router.get('/me', AuthMiddleware, async (req, res) => {
  const user = await User.findOne({ _id: res.locals.userId }, { password: 0 }).exec()
  if (!user) return res.status(401).send({ error: true, details: 'not found' })

  res.json(user)
})

export default router
