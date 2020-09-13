import { Schema, model } from 'mongoose'

const messageSchema = new Schema({
  content: { type: String },
  kind: { type: String, enum: ['Snap', 'Text'] },
  openedAt: { type: Date },
  receivedAt: { type: Date },
  receiverId: { type: Schema.Types.ObjectId, ref: 'User' },
  sender: { type: Schema.Types.ObjectId, ref: 'User' },
  sentAt: { type: Date, default: Date.now },
})

export default model('Message', messageSchema)
