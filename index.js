const express = require('express')
const cors = require("cors")

const app = express();

app.use(cors())
app.use(express.json())
app.use("/", (req,res) => {
    res.send('Welcome back. Again.')
})

app.listen(process.env.PORT || 3000, process.env.HOSTNAME || "127.0.0.1", () => {
    console.log(`listening. lol`)
})
