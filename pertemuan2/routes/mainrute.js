const express = require('express')

const router = express.Router()

router.get('/', (req, res) => {
    console.log(req.query)
    res.send("Selamat dolanan!")
})

router.get('/json', (req, res) => {
    res.json(req.query)
})

router.get('/show/:category/:name', (req, res) => {
    res.send(`Category: ${req.params.category} <br>Name: ${req.params.name}`)
})

router.get('/', (req, res) => {
    res.send("Tidak ada!")
})

module.exports = router