const { errorMiddleware } = require('./error')
const { ValidationMiddleware } = require('./validation')
const { AuthMiddleware } = require('./auth')

exports.error = errorMiddleware
exports.Validation = ValidationMiddleware
exports.Auth = AuthMiddleware