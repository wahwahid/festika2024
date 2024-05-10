const express = require('express')
const fs = require('fs')
const path = require('path')
const { log } = require('../service/log')
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

router.get('/show', (req, res) => {
    const filepath = path.join(process.cwd(), '/storage/manual/', req.query.filename)
    if (!fs.existsSync(filepath)) {
        log().info("file not found", {"filepath": filepath})
        res.status(404).send('File not found!')
        return
    }
    res.sendFile(filepath, (err) => {
        if (err) {
            log().error("error download file", { "filepath": filepath, "stack": err.stack })
            res.status(505).send("Error download file!")
        }
    })
})

module.exports = router