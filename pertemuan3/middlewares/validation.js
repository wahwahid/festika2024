const { log } = require('../service/log')
const validate = require('express-validator')

class ValidationMiddleware {
    validateID = (req, res, next) => {
        if (req.params.id == "") {
            res.sendStatus(400)
            return
        }
        next()
    }
    validateRequest = (req, res, next) => {
        const errors = validate.validationResult(req)
        if (!errors.isEmpty()) {
            log().debug(`invalid input at "${req.originalUrl}"`, errors.array())
            res.sendStatus(400)
            return
        }
        next()
    }
}

exports.ValidationMiddleware = ValidationMiddleware