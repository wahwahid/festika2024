const express = require('express')
const fs = require('fs')
const multer = require('multer')
const router = express.Router()

const upload = multer()
const uploadAndStore = multer({
    storage: multer.diskStorage({
        destination: './storage/auto',
        filename: (req, file, cb) => {
            let filename = file.originalname
            if (file.mimetype == "text/csv") {
                filename = `csv/${Date.now()}.csv`
            }
            cb(null, filename)
        }
    }),
})

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

router.post('/batch', upload.array('file'), (req, res) => {
    let data = []
    let errors = []
    for (const file of req.files) {
        const { originalname, mimetype, buffer } = file
        fs.writeFile(`./storage/manual/${originalname}`, buffer, (error) => {
            if (error) {
                errors.push(error)    
            } else {
                data.push({ originalname, mimetype })
            }
        })
    }
    res.json({data, errors})
})

router.post('/multi', uploadAndStore.fields([
    {name: 'csv', maxCount: 1},
    {name: 'images', maxCount: 2}
]), (req, res) => {
    let dataCsv = []
    for (const file of req.files.csv) {
        const { originalname, mimetype, path } = file
        dataCsv.push({ originalname, mimetype, path })
    }
    let dataImages = []
    for (const file of req.files.images) {
        const { originalname, mimetype, path } = file
        dataImages.push({ originalname, mimetype, path })
    }
    res.json({dataCsv, dataImages})
})

module.exports = router