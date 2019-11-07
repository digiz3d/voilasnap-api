import Message from '../models/Message'

export default async (req, res) => {
  console.log(req.query)

  try {
    const message = await Message.findOne({ _id: req.params.messageId, openedAt: null })
      .or([{ senderId: res.locals.userId }, { receiverId: res.locals.userId }])
      .exec()
    if (!message) return res.status(404).send({ error: true, details: 'message not found' })

    if (message.receiverId.toString() === res.locals.userId) {
      message.openedAt = Date.now()
      message.save()
      console.log('sauvé')
    } else {
      console.log('pas sauvé', typeof message.receiverId, typeof res.locals.userId)
    }

    if (req.query.pure) {
      if (message.kind === 'Snap') {
        return res.end(Buffer.from(message.content, 'base64'))
      } else return res.send(message.content)
    }
    return res.send({ success: true, payload: message })
  } catch (err) {
    console.log(err)
    return res.status(400).send({ error: true })
  }
}
