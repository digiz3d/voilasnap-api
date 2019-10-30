import { Schema, model } from 'mongoose'

const userSchema = new Schema({
  username: { type: String },
  password: { type: String },
  createAt: { type: Date, default: Date.now },
})

export default model('User', userSchema)
