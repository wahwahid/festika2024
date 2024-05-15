const { log } = require('../service/log')

function unhandledError(err, req, res, next) {
    log().error("unhandled error: ", err)
    if (res.headersSent) {
        return next(err)
    }
    const status = err.status || 500
    let body = {
        code: err.code || status,
        message: err.message || "Something wrong"
    }
    if (process.env.NODE_ENV !== "production") {
        body.data  = err.data
        body.stack = err.stack
    }
    res.status(status).json(body)
}

function notFoundError(req, res) {
    res.status(404).json({
        code: 404,
        message: "Invalid page"
    })
}

exports.errorMiddleware = {
    unhandledError,
    notFoundError
}