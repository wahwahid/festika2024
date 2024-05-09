const express = require('express')
const multer = require('multer')
const router = express.Router()

const upload = multer()

router.post('/basic', (req, res) => {
    res.json(req.body)
})

router.post('/advanced', upload.none(), (req, res) => {
    res.json(req.body)
})

module.exports = router