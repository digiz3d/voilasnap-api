import { Schema, model } from 'mongoose'

const userSchema = new Schema({
  createAt: { type: Date, default: Date.now },
  password: { type: String },
  username: { type: String },
})

export default model('User', userSchema)
