const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
    res.send('Sugeng rawuh!')
})

app.listen(port, () => {
    console.log(`Aplikasi menika siap wonten ing port: ${port}`)
})