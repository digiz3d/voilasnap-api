export default async (req, res) => {
  const x = await res.locals.user.populate('friends.list', '_id username createdAt').execPopulate()
  const friend = x.friends.list.find((friend) => friend._id.toString() === req.params.userId)
  if (!friend) return res.status(404).json({ error: true, details: 'friend not found' })
  res.json({ success: true, friend })
}
