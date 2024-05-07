const express = require('express')
const indexRouter = require('./routes/index')

const app = express()
app.use(indexRouter)

const port = 3000
app.listen(port, () => {
    console.log(`Aplikasi menika siap wonten ing port: ${port}`)
})