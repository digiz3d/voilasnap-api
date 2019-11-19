import { hash, genSalt } from 'bcryptjs'

import User from '../models/User'

const saltRounds = 10

export default async (req, res) => {
  const { username, password } = req.body

  try {
    if (!username) throw new Error('no username provided')
    if (!password) throw new Error('no password provided')
  } catch (err) {
    return res.status(400).send({ error: true, details: err.message })
  }

  const user = await User.findOne({ username }).exec()

  if (user) return res.status(409).send({ error: true, details: 'already registered' })

  const salt = await genSalt(saltRounds)
  const passwordHash = await hash(password, salt)

  await User.create({ username, password: passwordHash })

  res.status(204).send()
}
