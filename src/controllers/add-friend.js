import User from '../models/User'

export default async (req, res) => {
  const user = await User.findOne({ _id: req.params.userId }).exec()

  if (!user) return res.status(404).send({ error: true, details: 'user not found' })

  try {
    if (res.locals.user.friends.received.map((id) => id.toString()).includes(user._id.toString())) {
      await Promise.all([
        User.update(
          { _id: res.locals.userId },
          { $addToSet: { 'friends.list': user._id }, $pull: { 'friends.received': user._id } },
        ),
        User.update(
          { _id: user._id },
          { $addToSet: { 'friends.list': res.locals.userId }, $pull: { 'friends.sent': res.locals.userId } },
        ),
      ])
    } else {
      await Promise.all([
        User.update({ _id: res.locals.userId }, { $addToSet: { 'friends.sent': user._id } }),
        User.update({ _id: user._id }, { $addToSet: { 'friends.received': res.locals.userId } }),
      ])
    }
    return res.send({ success: true })
  } catch (err) {
    return res.status(400).send({ error: true })
  }
}
