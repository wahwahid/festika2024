const express = require('express')
const router = express.Router()

router.get('/error', (req, res) => {
    res.sendStatus(req.query.code)
})

router.get('/custom', (req, res) => {
    res.status(req.query.code).send("Custom")
})

router.get('/json', (req, res) => {
    res.status(req.query.code).json(req.query)
})

module.exports = router