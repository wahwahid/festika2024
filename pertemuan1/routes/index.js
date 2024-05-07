const express = require('express')

const router = express.Router()

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