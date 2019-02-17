'use strict';
const morgan = require('morgan');
// Defining request Id token
morgan.token('id', req => req.id);
const loggerFormat = ':id [:date[web]]" :method :url" :status :response-time';

module.exports = {
    morgan,
    loggerFormat,
};
