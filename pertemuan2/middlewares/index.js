const { errorMiddleware } = require('./error')
const { ValidationMiddleware } = require('./validation')

exports.error = errorMiddleware
exports.Validation = ValidationMiddleware