import Message from '../models/Message'
import User from '../models/User'

import redisClient from '../utils/redis'

export default async (req, res) => {
  const user = await User.findOne({ _id: req.params.userId }, { _id: 1 }).exec()

  if (!user) return res.status(404).send({ error: true, details: 'user not found' })

  const isSnap = !!req.file

  const messageId = Message.makeId(res.locals.userId, user._id)
  const content = isSnap ? messageId : req.body.text
  const buffer = req.file?.buffer

  try {
    const promises = []
    if (buffer) promises.push(redisClient.set(messageId, buffer))
    promises.push(
      Message.create({ sender: res.locals.userId, receiver: user._id, kind: isSnap ? 'Snap' : 'Text', content }),
    )
    await Promise.all(promises)
    return res.send({ success: true })
  } catch (err) {
    return res.status(400).send({ error: true })
  }
}
