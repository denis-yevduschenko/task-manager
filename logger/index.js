const winston = require('winston');

const logger = new (winston.Logger)({
    transports: [
        new (winston.transports.Console)({
            colorize: true,
            level: 'info'
        }),
        new (winston.transports.File)({
            filename: 'file.log',
            timestamp: true,
            level: 'debug'
        })
    ]
});

module.exports = logger;
