const express = require('express')
const logger = require('morgan')
const cors = require('cors')

const textRouter = require('./router/api/comments')

const app = express()

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'
app.use(logger(formatsLogger))
app.use(
    cors({
        origin: "*",
        methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
        preflightContinue: false,
        optionsSuccessStatus: 204,
    })
)

app.use(express.json())
app.use(express.static('/public'))

app.use('/api/text', textRouter)

app.use((req, res) => {
    res.status(404).json({ message: 'Not found' })
})

app.use((err, req, res, next) => {
    res.status(500).json({ message: err.message })
})

module.exports = app