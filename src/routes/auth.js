import express from 'express'
import { hash, genSalt, compare } from 'bcrypt'
import { sign } from 'jsonwebtoken'

import User from '../models/User'
import AuthMiddleware from '../middleware/auth'

const router = express.Router()
const saltRounds = 10

router.post('/signup', async (req, res) => {
  const { username, password } = req.body

  try {
    if (!username) throw new Error('no username provided')
    if (!password) throw new Error('no password provided')
  } catch (err) {
    return res.status(500).send({ error: true, details: err.message })
  }

  const user = await User.findOne({ username }).exec()

  if (user) return res.status(409).send({ error: true, details: 'already registered' })

  const salt = await genSalt(saltRounds)
  const passwordHash = await hash(password, salt)

  await User.create({ username, password: passwordHash })

  res.status(204).send()
})

router.post('/signin', async (req, res) => {
  const { username, password } = req.body

  try {
    if (!username) throw new Error('no username provided')
    if (!password) throw new Error('no password provided')
  } catch (err) {
    return res.status(500).send({ error: true, details: err.message })
  }

  const user = await User.findOne({ username }).exec()

  if (!user) return res.status(404).send({ error: true, details: 'user not found' })

  const comparison = await compare(password, user.password)
  if (!comparison) return res.status(403).send({ error: true, details: 'wrong password' })

  const token = sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: 60 * 60 * 24 * 3 })

  res.json({ success: true, token })
})

router.get('/me', AuthMiddleware, async (req, res) => {
  const user = await User.findOne({ id: res.locals.userId }, { password: 0 }).exec()
  if (!user) return res.status(500).send({ error: true, details: 'not found' })

  res.json(user)
})

export default router
