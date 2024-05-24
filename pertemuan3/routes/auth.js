const express = require('express')
const validate = require('express-validator')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const capture = require('../helpers/express').asyncHandler

const withValidCred = [
    validate.body('email').isEmail(),
    validate.body('password').notEmpty(),
]

/**
 * 
 * @param { import("../middlewares/index").Validation } validationMw
 * @param { string } jwtSecret
 * @param { import("knex").Knex } db
 */
function authRouter(validationMw, jwtSecret, db) {
    const router = express.Router()

    router.post('/login', withValidCred, validationMw.validateRequest, capture(async (req, res) => {
        const user = await db('users').select('*').where({ email: req.body.email, status: 1 }).first()
        if (!user) {
            res.sendStatus(401)
            return
        }
        const isValid = bcrypt.compareSync(req.body.password, user.password)
        if (!isValid) {
            res.sendStatus(401)
            return
        }
        const token = jwt.sign({
            id: user.id,
            email: user.email,
            fullname: user.fullname,
            role: user.role,
        }, jwtSecret, { expiresIn: '2m' })
        res.json({ token })
    }))

    return router
}

exports.authRouter = authRouter