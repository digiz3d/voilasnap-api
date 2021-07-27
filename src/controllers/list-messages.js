import Message from '../models/Message'

export default async (req, res) => {
  try {
    const messages = await Message.find(
      { receiver: res.locals.userId },
      { _id: 1, receiver: 1, sender: 1, kind: 1, sentAt: 1 },
    ).exec()

    if (!messages) return res.status(404).send({ error: true, details: 'No message found' })

    return res.send({ success: true, messages })
  } catch (err) {
    return res.status(400).send({ error: true })
  }
}
