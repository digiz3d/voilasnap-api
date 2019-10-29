import dotenv from 'dotenv'
dotenv.config()

import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'

import auth from './routes/auth'
import AuthMiddleware from './middleware/auth'

mongoose.connect(process.env.MONGODB_CONNECTION_STRING, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

const app = express()

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
  res.json({ welcome: true })
})

app.use('/auth', auth)
app.use(AuthMiddleware)
app.use('/coucou', (req, res) => res.json({ coucou: true }))

app.use((req, res) => {
  res.status(404).json({ error: true })
})

app.listen(process.env.PORT, process.env.HOSTNAME || '127.0.0.1', () => {
  console.log(`listening ${process.env.PORT}`)
})
