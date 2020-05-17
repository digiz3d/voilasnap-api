import User from '../models/User'

export default async (req, res) => {
  try {
    const usernameString = typeof req.body.username === 'string' ? req.body.username : JSON.stringify(req.body.username)
    const username = usernameString.replace(/[^a-zA-Z0-9]/g, '.')
    const usernameRegex = new RegExp(`^${username}`, 'i')

    const users = await User.find({ username: usernameRegex }, { _id: 1, username: 1 })
      .sort({ createdAt: 1 })
      .limit(15)
      .exec()

    if (!users) return res.status(404).send({ error: true, details: 'No message found' })

    return res.send({ success: true, users })
  } catch (err) {
    console.log(err)
    return res.status(400).send({ error: true })
  }
}
