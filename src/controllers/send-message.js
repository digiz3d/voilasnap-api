import Message from '../models/Message'
import User from '../models/User'

export default async (req, res) => {
  const user = await User.findOne({ _id: req.params.userId }).exec()

  if (!user) return res.status(404).send({ error: true, details: 'user not found' })

  const isSnap = !!req.body.image

  const content = isSnap ? req.body.image : req.body.text

  try {
    await Message.create({ senderId: res.locals.userId, receiverId: user._id, kind: isSnap ? 'Snap' : 'Text', content })
    return res.send({ success: true })
  } catch (err) {
    return res.status(400).send({ error: true })
  }
}
