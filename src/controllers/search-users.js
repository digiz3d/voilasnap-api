import User from '../models/User'

const fields = ['_id', 'username', 'createdAt']
const fieldsString = fields.join(' ')

export default async (req, res) => {
  try {
    const usernameString = typeof req.body.username === 'string' ? req.body.username : JSON.stringify(req.body.username)
    const username = usernameString.replace(/[^a-zA-Z0-9]/g, '.')
    const usernameRegex = new RegExp(`^${username}`, 'i')

    const queryUsers = await User.find({ username: usernameRegex })
      .select(`${fieldsString} friends`)
      .sort({ createdAt: 1 })
      .limit(15)
      .exec()

    const users = queryUsers.map((user) => ({
      _id: user._id,
      username: user.username,
      createdAt: user.createdAt,
      isFriend: user.friends.list.includes(res.locals.userId),
      isReceived: user.friends.sent.includes(res.locals.userId),
      isSent: user.friends.received.includes(res.locals.userId),
    }))

    return res.send({ success: true, users })
  } catch (err) {
    console.log(err)
    return res.status(400).send({ error: true })
  }
}
