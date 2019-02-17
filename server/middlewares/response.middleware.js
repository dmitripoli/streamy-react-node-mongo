const bunyanLogger = require('../logger/bunyan.logger');
const _ = require('lodash');

exports.initResponseHandler = (app) => {
  app.use(async (req, res, next) => {
    const status = _.get(res, 'locals.response.status');
    const message = _.get(res, 'locals.response.message');
    const data = _.get(res, 'locals.response.data');
    const responseMeta = _.get(res, 'locals.response.responseMeta');
    const response = { message, data, responseMeta };
    bunyanLogger.logResponse(response);
    res.status(status).json(response);
  });
};
