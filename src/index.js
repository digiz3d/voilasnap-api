import dotenv from 'dotenv'
dotenv.config()

import cors from 'cors'
import express from 'express'
import mongoose from 'mongoose'

import auth from './routes/auth'
import AuthMiddleware from './middleware/auth'
import friends from './routes/friends'
import messages from './routes/messages'
import users from './routes/users'

import { version } from '../package.json'

mongoose
  .connect(process.env.MONGODB_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 3000,
  })
  .then(() => console.log('connected to mongo db'))
  .catch((e) => console.log('error connecting to mongo db', e))

const app = express()

app.use(cors())
app.use(express.json({ limit: '50mb' }))

if (process.env.NODE_ENV === 'development') {
  app.use(async (req, res, next) => {
    console.log(req.method, req.url, '\n\t', req.body)
    next()
  })
}

app.get('/', (req, res) => {
  res.json({ welcome: true, version })
})

app.use('/auth', auth)
app.use(AuthMiddleware)
app.use('/friends', friends)
app.use('/messages', messages)
app.use('/users', users)

app.use((req, res) => {
  res.status(404).json({ error: true })
})

app.listen(process.env.PORT, () => {
  console.log(`listening ${process.env.PORT}`)
})
