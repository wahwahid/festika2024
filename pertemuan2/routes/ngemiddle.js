const express = require('express')
const path = require('path')
const { log } = require('../service/log')
const router = express.Router()
const subRouter = express.Router()

// before middleware
router.get('/doubler', (req, res, next) => {
    req.query.total = Number(req.query.input) * 2
    next()
}, (req, res) => {
    res.json(req.query)
})

const greeter = (req, res, next) => {
    if (req.query.name == "") {
        res.sendStatus(400)
        return
    }
    switch (req.query.lang) {
        case "jv":
            req.query.greet = `Piye kabare`
            break;
        case "id":
            req.query.greet = `Gimana kabarnya`
            break;
        default:
            req.query.greet = ''
            break;
    }
    next()
}

router.get('/greeter', greeter, (req, res) => {
    req.query.greet += ` ${req.query.name}`
    res.json(req.query)
})

router.use('/ramah', subRouter)
subRouter.use(greeter)
subRouter.get('/mba', (req, res) => {
    req.query.greet += ` mba ${req.query.name}?`
    res.json(req.query)
})
subRouter.get('/mas', (req, res) => {
    req.query.greet += ` mas ${req.query.name}?`
    res.json(req.query)
})

// after middleware
const withHttpLog = (req, res, next) => {
    next()
    log().http(`${req.method} ${path.join(req.baseUrl, req.path)} ${res.statusCode}`)
}
router.get('/logged', withHttpLog, (req, res) => {
    res.send("Request Logged")
})

// wrapper middleware
const withHttpLogTime = (req, res, next) => {
    const start = Date.now()
    next()
    const stop = Date.now()
    log().http(`${req.method} ${path.join(req.baseUrl, req.path)} ${res.statusCode} ${stop-start}ms`)
}
router.get('/logtime', withHttpLogTime, (req, res) => {
    res.send("Request logged with response time")
})

// chained
router.get('/berantai', (req, res, next) => {
    req.query.urutan = []
    req.query.urutan.push(1)
    log().info("middleware lapis 1")
    next()
}, (req, res, next) => {
    req.query.urutan.push(2)
    log().info("middleware lapis 2")
    next()
}, (req, res, next) => {
    next()
    req.query.urutan.push(3)
    log().info("middleware lapis 3")
}, (req, res, next) => {
    next()
    req.query.urutan.push(4)
    log().info("middleware lapis 4")
}, (req, res, next) => {
    req.query.urutan.push(5)
    log().info("middleware lapis 5")
    next()
}, (req, res) => res.json(req.query))

module.exports = router