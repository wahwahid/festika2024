const dotenv = require('dotenv')
const express = require('express')
const hbs = require('express-hbs')
const morgan = require('morgan')
const path = require('path')
const helmet = require('helmet')
const cors = require('cors')

const { log, SetLog } = require('./service/log')
const database = require('./service/database')
const repo = require('./repositories')
const mw = require('./middlewares')
const ctrl = require('./controllers')
const routes = require('./routes')
const { authRouter } = require('./routes/auth')

dotenv.config()
SetLog({
  env: process.env.NODE_ENV || "",
  level: process.env.LOG_LEVEL || "",
  destination: process.env.LOG_DIR || "",
})
const dbConn = database.Connect({
  debug: process.env.DATABASE_DEBUG,
  client: process.env.DATABASE_DRIVER || 'mysql2',
  connection: process.env.DATABASE_URL,
})

const app = express()

const menuDBRepo = new repo.MenuDB(dbConn)

const validationMw = new mw.Validation()
const authMw = new mw.Auth(process.env.JWT_SECRET)

const menuCtrl = new ctrl.Menu(menuDBRepo)

const indexRoutes = routes.indexRouter(validationMw, authMw, menuCtrl)

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
app.use(helmet())
app.use(cors({
  origin: 'https://festika2024.wahwahid.com'
}))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(indexRoutes)
app.use('/auth', authRouter(validationMw, process.env.JWT_SECRET, dbConn, authMw))
app.use(mw.error.notFoundError)
app.use(mw.error.unhandledError)

const port = process.env.PORT
app.listen(port, () => {
  log().info(`Aplikasi menika siap wonten ing port: ${port}`)
})