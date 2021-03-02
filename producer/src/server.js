const express = require("express")
const app = express()
require("dotenv").config()
const producer = require("./controllers/producer")

const { PORT } = process.env

app.get('/', (req, res) => {
    res.status(200).send({ api: "0.0.1"})
})

app.get('/send', producer.sendData)

app.listen(PORT || 3000, () => {
    console.log(`Listening at port ${PORT}`);
})