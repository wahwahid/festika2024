const express = require('express')
const capture = require('../helpers/express').asyncHandler

/**
 * 
 * @param { import("../middlewares/index").Validation } validationMw
 * @param { import("../controllers/index").Menu } menuCtrl
 */
function menuRouter(validationMw, menuCtrl) {
    const router = express.Router()

    router.get('/', capture(menuCtrl.getList))
    router.post('/', menuCtrl.withValidBody, validationMw.validateRequest, capture(menuCtrl.add))
    router.get('/render', capture(menuCtrl.render))
    router.get('/:id', menuCtrl.withValidID, validationMw.validateRequest, capture(menuCtrl.getByID))
    router.post('/:id', menuCtrl.withValidID, menuCtrl.withValidBody, validationMw.validateRequest, capture(menuCtrl.update))
    router.delete('/:id', menuCtrl.withValidID, validationMw.validateRequest, capture(menuCtrl.remove))

    return router
}

exports.menuRouter = menuRouter