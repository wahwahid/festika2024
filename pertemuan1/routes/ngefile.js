const express = require('express')
const fs = require('fs')
const path = require('path')
const router = express.Router()

router.get('/get', (req, res) => {
    const filepath = path.join(process.cwd(), '/storage/manual/abc.png')
    res.sendFile(filepath)
})

router.get('/download', (req, res) => {
    const filepath = path.join(process.cwd(), '/storage/manual/abc.png')
    res.download(filepath)
})

router.get('/stream', (req, res) => {
    const filepath = path.join(process.cwd(), '/storage/manual/abc.png')
    const buffer = fs.readFileSync(filepath)
    res.contentType('png')
        .attachment('cde.png')
        .send(buffer)
        .end()
})

module.exports = router