const express = require('express')
const capture = require('../helpers/express').asyncHandler

/**
 * 
 * @param { import("../middlewares/index").Validation } validationMw
 * @param { import("../middlewares/index").Auth } authMw
 * @param { import("../controllers/index").Menu } menuCtrl
 */
function menuRouter(validationMw, authMw, menuCtrl) {
    const router = express.Router()

    router.use(authMw.loadJWT)

    router.get('/',
        authMw.isLoggedIn,
        capture(menuCtrl.getList)
    )
    router.post('/',
        authMw.isLoggedIn, authMw.isRole(authMw.ROLE_ADMIN),
        menuCtrl.withValidBody, validationMw.validateRequest,
        capture(menuCtrl.add)
    )
    router.get('/render',
        capture(menuCtrl.render)
    )
    router.get('/:id',
        menuCtrl.withValidID, validationMw.validateRequest,
        capture(menuCtrl.getByID)
    )
    router.put('/:id',
        authMw.isLoggedIn, authMw.isRole(authMw.ROLE_ADMIN),
        menuCtrl.withValidID, menuCtrl.withValidBody, validationMw.validateRequest,
        capture(menuCtrl.update)
    )
    router.delete('/:id',
        authMw.isLoggedIn, authMw.isRole(authMw.ROLE_ADMIN),
        menuCtrl.withValidID, validationMw.validateRequest,
        capture(menuCtrl.remove)
    )

    return router
}

exports.menuRouter = menuRouter