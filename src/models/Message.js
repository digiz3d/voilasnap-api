import { Schema, model } from 'mongoose'

const messageSchema = new Schema({
  content: { type: String },
  kind: { type: String, enum: ['Snap', 'Text'] },
  openedAt: { type: Date },
  receivedAt: { type: Date },
  receiver: { type: Schema.Types.ObjectId, ref: 'User' },
  sender: { type: Schema.Types.ObjectId, ref: 'User' },
  sentAt: { type: Date, default: Date.now },
})

messageSchema.statics.makeId = function (senderId, receiverId) {
  const ms = new Date().getTime()
  return senderId < receiverId ? `${senderId}${receiverId}${ms}` : `${receiverId}${senderId}${ms}`
}

export default model('Message', messageSchema)
