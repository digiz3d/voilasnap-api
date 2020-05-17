export default async (req, res) => {
  const me = await res.locals.user.populate('friends.list', '_id username createdAt').execPopulate()

  const users = me.friends.list.map((user) => ({
    ...user.toObject(),
    isFriend: true,
    isReceived: false,
    isSent: false,
  }))

  res.json({ success: true, users })
}
