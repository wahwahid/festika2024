const express = require('express')
const mainRuteRoute = require('./mainrute')
const ngestatusRoute = require('./ngestatus')
const ngebodyRoute = require('./ngebody')
const ngefileRoute = require('./ngefile')
const menuRoute = require('./menu')
const ngemiddleRoute = require('./ngemiddle')
const ngevalidRoute = require('./ngevalid')
const ngedbRoute = require('./ngedb')

/**
 * 
 * @param { import("../middlewares/index").Validation } validationMw
 * @param { import("../controllers/index").Menu } menuCtrl
 */
function indexRouter(
    validationMw,
    menuCtrl
) {
    const router = express.Router()

    router.use('/mainrute', mainRuteRoute)
    router.use('/ngestatus', ngestatusRoute)
    router.use('/ngebody', ngebodyRoute)
    router.use('/ngefile', ngefileRoute)
    router.use('/menu', menuRoute.menuRouter(validationMw, menuCtrl))
    router.use('/ngemiddle', ngemiddleRoute)
    router.use('/ngevalid', ngevalidRoute)
    router.use('/ngedb', ngedbRoute)
    router.use('/public', express.static('storage/public'))

    router.get('/', (req, res) => {
        res.send('Sugeng rawuh!')
    })

    router.post('/', (req, res) => {
        res.send('Niki POST')
    })

    router.put('/', (req, res) => {
        res.send('Niki PUT')
    })

    router.delete('/', (req, res) => {
        res.send('Niki delete')
    })

    return router
}

exports.indexRouter = indexRouter