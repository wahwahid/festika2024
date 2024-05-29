const statuses = require('statuses')

const asyncHandler = fn => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next)
}

const jsonResponse = (res, data, ...options) => {
    const status = options[0]
    const message = options[1]
    const code = options[2]

    if (status) {
        res.status(status)
    }
    let body = {
        code: code || res.statusCode,
        message: message || statuses.message[code] || statuses.message[res.statusCode],
        data: data || {}
    }

    res.json(body)
}

exports.asyncHandler = asyncHandler
exports.jsonResponse = jsonResponse