import dotenv from 'dotenv'
dotenv.config()

import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'

import auth from './routes/auth'
import AuthMiddleware from './middleware/auth'
import messages from './routes/messages'
import users from './routes/users'

mongoose
  .connect(process.env.MONGODB_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 3000
  })
  .then(() => console.log('connected to mongo db'))
  .catch((e) => console.log('error connecting to mongo db',e))

const app = express()

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
  res.json({ welcome: true })
})

app.use('/auth', auth)
app.use(AuthMiddleware)
app.use('/users', users)
app.use('/messages', messages)

app.use((req, res) => {
  res.status(404).json({ error: true })
})

app.listen(process.env.PORT, () => {
  console.log(`listening ${process.env.PORT}`)
})
