'use strict';
const bunyanLogger = require('../logger/bunyan.logger');
const errorHandler = async function(error) {
    return bunyanLogger.logError(error.stack, error.description);
};

exports.initErrorHandler = app => {
    app.use(async (err, req, res, next) => {
        await errorHandler(err);
        if (process.env.ENV !== 'LOCAL') {
            res.status(500).send('Error occurred!');
        } else {
            res.status(500).send(err);
            // next();
        }
    });
};
