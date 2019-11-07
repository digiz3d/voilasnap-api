import User from '../models/User'

export default async (req, res) => {
  try {
    const users = await User.find({ username: new RegExp(`^${req.body.username}`) }, { _id: 1, username: 1 })
      .sort({ createAt: 1 })
      .limit(15)
      .exec()

    if (!users) return res.status(404).send({ error: true, details: 'No message found' })

    return res.send({ success: true, payload: users })
  } catch (err) {
    return res.status(400).send({ error: true })
  }
}
