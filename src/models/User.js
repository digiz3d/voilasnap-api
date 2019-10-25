import { Schema, model } from 'mongoose'

const userSchema = new Schema({
  username: { type: String },
  password: { type: String },
})

export default model('User', userSchema)
