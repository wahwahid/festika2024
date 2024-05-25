const express = require('express')
const validate = require('express-validator')
const router = express.Router()

router.get('/name/:name', validate.param('name').isAlpha(), (req, res) => {
    let validations = validate.validationResult(req)
    if (!validations.isEmpty()) {
        res.status(400).json({ validations: validations.array() })
        return
    }
    let message = `Hello ${req.params.name}`
    res.json({ message })
})

router.get('/id/:id', validate.param('name').isNumeric(), (req, res) => {
    let validations = validate.validationResult(req)
    if (!validations.isEmpty()) {
        res.status(400).json({ validations: validations.array() })
        return
    }
    let message = `Your ID is ${req.params.id}`
    res.json({ message })
})

router.get('/', [
    validate.query('firstname').isAlpha(),
    validate.query('lastname').isAlpha().optional()
], (req, res) => {
    let validations = validate.validationResult(req)
    if (!validations.isEmpty()) {
        res.status(400).json({ validations: validations.array() })
        return
    }
    let message = `Hello ${req.query.firstname} ${req.query.lastname || ''}`
    res.json({ message })
})

module.exports = router