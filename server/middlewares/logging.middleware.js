'use strict';
const morganLogger = require('../logger/morgan.logger');
const addRequestId = require('express-request-id')();
const bunyanLogger = require('../logger/bunyan.logger');

exports.initLoggingMiddleWare = app => {
    // Add request id tot the req object - retrieved by req.id
    app.use(addRequestId);
    app.use(
        morganLogger.morgan(morganLogger.loggerFormat, {
            skip: (req, res) => res.statusCode < 400,
            stream: process.stderr,
        })
    );

    app.use(
        morganLogger.morgan(morganLogger.loggerFormat, {
            skip: (req, res) => res.statusCode >= 400,
            stream: process.stdout,
        })
    );

    app.use((req, res, next) => {
        const loggerInstance = bunyanLogger.loggerInstance();
        const log = loggerInstance.child(
            {
                id: req.id,
                body: req.body,
            },
            true
        );
        log.info({ req: req });
        next();
    });

    app.use((req, res, next) => {
        function afterResponse() {
            res.removeListener('finish', afterResponse);
            res.removeListener('close', afterResponse);
            const loggerInstance = bunyanLogger.loggerInstance();
            const log = loggerInstance.child(
                {
                    id: req.id,
                },
                true
            );
            log.info({ res: res }, 'response');
        }
        res.on('finish', afterResponse);
        res.on('close', afterResponse);
        next();
    });
};
