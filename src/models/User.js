import { Schema, model } from 'mongoose'
import { v1 } from 'uuid'

const userSchema = new Schema({
  id: { type: String, default: v1 },
  username: { type: String },
  password: { type: String },
  createAt: { type: Date, default: Date.now },
})

export default model('User', userSchema)
