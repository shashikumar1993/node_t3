const winston = require('winston');

const consoleFormat = winston.format.combine(
    winston.format.timestamp({format:"HH:mm:ss.SSS"}),
    winston.format.colorize({all:true}),
    winston.format.printf(
        (info) => `${info.timestamp} ${info.level}: ${info.message}`
    )
)

const logger = winston.createLogger({
    transports:[
        new winston.transports.Console({
            format:consoleFormat,
        }),
    ]
})

module.exports = logger;