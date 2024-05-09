const express = require('express')
const dotenv = require('dotenv')
const indexRouter = require('./routes/index')

dotenv.config()

const app = express()
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(indexRouter)

const port = process.env.PORT
app.listen(port, () => {
    console.log(`Aplikasi menika siap wonten ing port: ${port}`)
})