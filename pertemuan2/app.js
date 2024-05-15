const express = require('express')
const hbs = require('express-hbs')
const dotenv = require('dotenv')
const path = require('path')
const mw = require('./middlewares/index')
const indexRouter = require('./routes/index')
const serviceLog = require('./service/log')

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
app.use(mw.error.notFoundError)
app.use(mw.error.unhandledError)

const port = process.env.PORT
app.listen(port, () => {
    console.log(`Aplikasi menika siap wonten ing port: ${port}`)
})