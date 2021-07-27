import Message from '../models/Message'
import redisClient from '../utils/redis'

export default async (req, res) => {
  try {
    const message = await Message.findOne({ _id: req.params.messageId, openedAt: null })
      .or([{ sender: res.locals.userId }, { receiver: res.locals.userId }])
      .exec()
    if (!message) return res.status(404).send({ error: true, details: 'message not found' })

    if (message.receiver.toString() === res.locals.userId) {
      message.openedAt = Date.now()
      message.save()
      console.log('sauvé')
    } else {
      console.log('pas sauvé', typeof message.receiver, typeof res.locals.userId)
    }

    if (req.query.pure) {
      if (message.kind === 'Snap') {
        var img = await redisClient.getBuffer(message.content)

        res.writeHead(200, {
          'Content-Type': 'image/jpeg',
          'Content-Length': img.length,
        })
        return res.end(img)
      } else return res.send(message.content)
    }
    return res.send({ success: true, message })
  } catch (err) {
    console.log(err)
    return res.status(400).send({ error: true })
  }
}
