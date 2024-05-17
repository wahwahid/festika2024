const express = require('express')
const hbs = require('express-hbs')
const dotenv = require('dotenv')
const morgan = require('morgan')
const path = require('path')
const mw = require('./middlewares/index')
const indexRouter = require('./routes/index')
const { log, SetLog } = require('./service/log')
const database = require('./service/database')

dotenv.config()
SetLog({
  env: process.env.NODE_ENV || "",
  level: process.env.LOG_LEVEL || "",
  destination: process.env.LOG_DIR || "",
})
database.Connect({
  debug: process.env.DATABASE_DEBUG,
  client: process.env.DATABASE_DRIVER || 'mysql2',
  connection: process.env.DATABASE_URL,
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
app.use(morgan(':method :url :status :response-time ms - :res[content-length]', {
  stream: {
    write: (message) => log().http(message.trim()),
  },
}))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(indexRouter)
app.use(mw.error.notFoundError)
app.use(mw.error.unhandledError)

const port = process.env.PORT
app.listen(port, () => {
  log().info(`Aplikasi menika siap wonten ing port: ${port}`)
})