const jwt = require('jsonwebtoken')
const { log } = require('../service/log')

class AuthMiddleware {
    constructor(jwtSecret) {
        this.jwtSecret = jwtSecret
    }
    loadJWT = (req, res, next) => {
        const bearerToken = req.header('Authorization')
        if (!bearerToken) {
            next()
            return
        }
        const jwtToken = bearerToken.split(' ')[1]
        if (!jwtToken) {
            next()
            return
        }
        try {
            const payload = jwt.verify(jwtToken, this.jwtSecret)
            if (payload) {
                req.auth = payload
            }
        } catch (error) {
            log().error('jwt verify error', error)
        }
        next()
    }
    isLoggedIn = (req, res, next) => {
        if (!req.auth) {
            res.sendStatus(401)
            return
        }
        next()
    }
}

exports.AuthMiddleware = AuthMiddleware