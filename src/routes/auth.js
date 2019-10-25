import express from 'express'

import User from '../models/User'

const router = express.Router()

router.get('/', (req, res) => {
  res.send('bj çaaa')
})

router.post('/signup', async (req, res) => {
  const { username, password } = req.body

  try {
    if (!username) throw new Error('no username provided')
    if (!password) throw new Error('no password provided')
  } catch (err) {
    res.status(500).send({ error: true, details: err.message })
  }

  await User.create({ username, password })

  res.status(204).send()
})

export default router
