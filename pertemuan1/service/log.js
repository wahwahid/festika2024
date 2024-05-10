const path = require('path')
const winston = require('winston')

let logger = winston.createLogger({
    silent: true,
    transports: [
        new winston.transports.Console()
    ]
})

function log() {
    return logger
}

function formatLog({ level, timestamp, message, stack, ...metadata }) {
    let msg = `[${level}][${timestamp}] ${message}`
    if (metadata) {
        msg = msg + `\t${JSON.stringify(metadata, "", 2)}`
    }
    if (stack) {
        msg = msg + `\n${stack}\n`
    }
    return msg
}

function SetLog(options = { env: "development", level: "", destination: "" }) {
    if (options.level === "") {
        options.level = (options.env === "production") ? "info" : "http"
    }
    if (options.destination === "") {
        options.destination = "log"
    }
    
    logger = winston.createLogger({
      level: options.level,
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json(),
      ),
      transports: [
        new winston.transports.File({ filename: path.join(options.destination, 'error.log'), level: 'error' }),
        new winston.transports.File({ filename: path.join(options.destination, 'combined.log') }),
      ],
    })
    
    if (options.env !== 'production') {
      logger.add(new winston.transports.Console({
        format: winston.format.combine(
            winston.format.colorize({ all: 'auto' }),
            winston.format.timestamp(),
            winston.format.printf(formatLog),
        ),
        handleExceptions: true,
        handleRejections: true,
      }))
    }    
}

exports.log = log
exports.SetLog = SetLog
