import { sign } from 'jsonwebtoken'
import { compare } from 'bcryptjs'
import User from '../models/User'

export default async (req, res) => {
  const { username, password } = req.body

  try {
    if (!username) throw new Error('no username provided')
    if (!password) throw new Error('no password provided')
  } catch (err) {
    return res.status(400).send({ error: true, details: err.message })
  }

  const user = await User.findOne({ username }).select('+password').exec()

  if (!user) return res.status(404).send({ error: true, details: 'user not found' })

  const comparison = await compare(password, user.password)

  if (!comparison) return res.status(403).send({ error: true, details: 'wrong password' })

  const token = sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: 60 * 60 * 24 * 3 })

  res.json({ success: true, token })
}
