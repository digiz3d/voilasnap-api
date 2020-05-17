import User from '../models/User'

export default async (req, res) => {
  const user = await User.findOne({ _id: req.params.userId }).exec()

  if (!user) return res.status(404).send({ error: true, details: 'user not found' })

  try {
    await Promise.all([
      User.updateOne(
        { _id: res.locals.userId },
        { $pull: { 'friends.list': user._id, 'friends.received': user._id, 'friends.sent': user._id } },
      ),
      User.updateOne(
        { _id: user._id },
        {
          $pull: {
            'friends.list': res.locals.userId,
            'friends.received': res.locals.userId,
            'friends.sent': res.locals.userId,
          },
        },
      ),
    ])

    return res.send({ success: true })
  } catch (err) {
    return res.status(400).send({ error: true })
  }
}
