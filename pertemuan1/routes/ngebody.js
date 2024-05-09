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

router.post('/file', upload.single('file'), (req, res) => {
    const { originalname, mimetype } = req.file
    let data = []
    if (mimetype == 'text/csv') {
        const lines = req.file.buffer.toString().split('\n')
        const headers = lines[0].trim().split(',')
        for (let i = 0; i < lines.length; i++) {
            const row = lines[i].trim().split(',')
            let item = {}
            headers.forEach((header, col) => {
                item[header] = row[col]
            })
            data.push(item)
        }
    }
    res.json({ originalname, mimetype, data })
})

module.exports = router