const jwt = require('jsonwebtoken')
const { log } = require('../service/log')

class AuthMiddleware {
    constructor(jwtSecret) {
        this.jwtSecret = jwtSecret
        this.ROLE_ADMIN = 'admin'
        this.ROLE_USER = 'user'
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
    isRole = (...roles) => (req, res, next) => {
        if (!req.auth.role || !roles.includes(req.auth.role)) {
            res.sendStatus(403)
            return
        }
        next()
    }
}

exports.AuthMiddleware = AuthMiddleware