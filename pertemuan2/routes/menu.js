const express = require('express')
const router = express.Router()

const controllers = require('../controllers')
const middlewares = require('../middlewares')
const menuCtrl = new controllers.Menu()
const validationMw = new middlewares.Validation()

router.get('/', menuCtrl.getList)
router.post('/', menuCtrl.withValidBody, validationMw.validateRequest, menuCtrl.add)
router.get('/render', menuCtrl.render)
router.get('/:id', menuCtrl.withValidID, validationMw.validateRequest, menuCtrl.getByID)
router.post('/:id', menuCtrl.withValidID, menuCtrl.withValidBody, validationMw.validateRequest, menuCtrl.update)
router.delete('/:id', menuCtrl.withValidID, validationMw.validateRequest, menuCtrl.remove)

module.exports = router