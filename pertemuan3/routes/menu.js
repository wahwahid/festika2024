const express = require('express')
const router = express.Router()

const controllers = require('../controllers')
const middlewares = require('../middlewares')
const helperExpress = require('../helpers/express')
const menuCtrl = new controllers.Menu()
const validationMw = new middlewares.Validation()

const capture = helperExpress.asyncHandler

router.get('/', capture(menuCtrl.getList))
router.post('/', menuCtrl.withValidBody, validationMw.validateRequest, capture(menuCtrl.add))
router.get('/render', capture(menuCtrl.render))
router.get('/:id', menuCtrl.withValidID, validationMw.validateRequest, capture(menuCtrl.getByID))
router.post('/:id', menuCtrl.withValidID, menuCtrl.withValidBody, validationMw.validateRequest, capture(menuCtrl.update))
router.delete('/:id', menuCtrl.withValidID, validationMw.validateRequest, capture(menuCtrl.remove))

module.exports = router