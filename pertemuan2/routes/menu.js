const express = require('express')
const router = express.Router()

const controllers = require('../controllers')
const menuCtrl = new controllers.Menu()

router.get('/', menuCtrl.getList)
router.post('/', menuCtrl.add)
router.get('/render', menuCtrl.render)
router.get('/:id', menuCtrl.getByID)
router.post('/:id', menuCtrl.update)
router.delete('/:id', menuCtrl.remove)

module.exports = router