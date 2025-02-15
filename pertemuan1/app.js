const express = require('express')
const dotenv = require('dotenv')
const path = require('path')
const indexRouter = require('./routes/index')
const serviceLog = require('./service/log')
const hbs = require('express-hbs')

dotenv.config()
serviceLog.SetLog({
    env: process.env.NODE_ENV || "",
    level: process.env.LOG_LEVEL || "",
    destination: process.env.LOG_DIR || "",
})

const app = express()
// view engine
app.set('views', path.join(process.cwd(), 'views'))
app.set('view engine', 'html')
app.engine('html', hbs.express4({
  extname: '.html',
  templateOptions: {
    allowProtoPropertiesByDefault: true
  }
}))
// general routes
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(indexRouter)

const port = process.env.PORT
app.listen(port, () => {
    console.log(`Aplikasi menika siap wonten ing port: ${port}`)
})