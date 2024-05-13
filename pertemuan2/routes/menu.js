const express = require('express')
const router = express.Router()

const controllers = require('../controllers')
const middlewares = require('../middlewares')
const menuCtrl = new controllers.Menu()
const menuMw = new middlewares.MenuValidator()

router.get('/', menuCtrl.getList)
router.post('/', menuCtrl.add)
router.get('/render', menuCtrl.render)
router.get('/:id', menuMw.validateID, menuCtrl.getByID)
router.post('/:id', menuMw.validateID, menuCtrl.update)
router.delete('/:id', menuMw.validateID, menuCtrl.remove)

module.exports = router