import { Schema, model } from 'mongoose'

const messageSchema = new Schema({
  senderId: { type: Schema.Types.ObjectId, ref: 'User' },
  receiverId: { type: Schema.Types.ObjectId, ref: 'User' },
  kind: { type: String, enum: ['Snap', 'Text'] },
  content: { type: String },
  sentAt: { type: Date, default: Date.now },
  receivedAt: { type: Date },
  openedAt: { type: Date },
})

export default model('Message', messageSchema)
