import Message from '../models/Message'

export default async (req, res) => {
  try {
    const messages = await Message.find(
      { receiverId: res.locals.userId, openedAt: null },
      { _id: 1, senderId: 1, kind: 1 },
    )
      .populate('senderId', { username: 1 })
      .exec()

    if (!messages) return res.status(404).send({ error: true, details: 'No message found' })

    return res.send({ success: true, messages })
  } catch (err) {
    return res.status(400).send({ error: true })
  }
}
