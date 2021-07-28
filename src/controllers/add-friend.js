import User from '../models/User'

export default async function addFriend(req, res) {
  const userId = req.params.userId || req.query.userId || req.body.userId

  if (!userId) return res.status(400).send({ error: true, details: 'user not found' })

  if (userId === res.locals.user._id.toString())
    return res.status(400).send({ error: true, details: 'can\t add yourself' })

  const user = await User.findOne({ _id: userId }).exec()

  if (!user) return res.status(404).send({ error: true, details: 'user not found' })

  try {
    if (res.locals.user.friends.received.map((id) => id.toString()).includes(user._id.toString())) {
      await Promise.all([
        User.updateOne(
          { _id: res.locals.userId },
          { $addToSet: { 'friends.list': user._id }, $pull: { 'friends.received': user._id } },
        ),
        User.updateOne(
          { _id: user._id },
          { $addToSet: { 'friends.list': res.locals.userId }, $pull: { 'friends.sent': res.locals.userId } },
        ),
      ])
    } else {
      await Promise.all([
        User.updateOne({ _id: res.locals.userId }, { $addToSet: { 'friends.sent': user._id } }),
        User.updateOne({ _id: user._id }, { $addToSet: { 'friends.received': res.locals.userId } }),
      ])
    }
    return res.send({ success: true })
  } catch (err) {
    return res.status(400).send({ error: true })
  }
}
