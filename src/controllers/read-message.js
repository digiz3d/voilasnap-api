import { Base64 } from 'js-base64'
import Message from '../models/Message'

const { atob } = Base64

export default async (req, res) => {
  console.log(req.query)

  try {
    const message = await Message.findOne({ _id: req.params.messageId })
      .or([{ senderId: res.locals.userId }, { receiverId: res.locals.userId }])
      .exec()
    if (!message) return res.status(404).send({ error: true, details: 'message not found' })

    if (req.query.pure) {
      if (message.kind === 'Snap') {
        res.set('Content-Type', 'image/png')
        return res.send(atob(message.content))
      } else return res.send(message.content)
    }
    return res.send({ success: true, payload: message })
  } catch (err) {
    return res.status(400).send({ error: true })
  }
}
