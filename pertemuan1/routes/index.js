const express = require('express')
const mainRuteRoute = require('./mainrute')
const ngestatusRoute = require('./ngestatus')
const ngebodyRoute = require('./ngebody')

const router = express.Router()

router.use('/mainrute', mainRuteRoute)
router.use('/ngestatus', ngestatusRoute)
router.use('/ngebody', ngebodyRoute)

router.get('/', (req, res) => {
    res.send('Sugeng rawuh!')
})

router.post('/', (req, res) => {
    res.send('Niki POST')
})

router.put('/', (req, res) => {
    res.send('Niki PUT')
})

router.delete('/', (req, res) => {
    res.send('Niki delete')
})

module.exports = router