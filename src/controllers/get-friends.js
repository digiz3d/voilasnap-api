export default async (req, res) => {
  const x = await res.locals.user
    .populate('friends.list', '_id username createdAt')
    .populate('friends.received', '_id username createdAt')
    .populate('friends.sent', '_id username createdAt')
    .execPopulate()
  res.json({ success: true, friends: x.friends.list, received: x.friends.received, sent: x.friends.sent })
}
