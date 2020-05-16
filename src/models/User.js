import { Schema, model } from 'mongoose'

const userSchema = new Schema({
  createdAt: { type: Date, default: Date.now },
  friends: {
    list: [{ type: Schema.Types.ObjectId, ref: 'User', default: [] }],
    received: [{ type: Schema.Types.ObjectId, ref: 'User', default: [] }],
    sent: [{ type: Schema.Types.ObjectId, ref: 'User', default: [] }],
  },
  password: { type: String, select: false },
  username: { type: String },
})

export default model('User', userSchema)
