import dotenv from 'dotenv'
dotenv.config()

import express from 'express'
import cors from 'cors'
import auth from './routes/auth'
import mongoose from 'mongoose'

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
app.use((req, res) => {
  res.status(404).json({ error: true })
})

app.use((err, req, res, next) => {
  res.status(500).json({ k: 'c' })
})

app.listen(
  process.env.PORT,
  process.env.HOSTNAME || '127.0.0.1',
  () => {
    console.log(`listening ${process.env.PORT}`)
  },
)
