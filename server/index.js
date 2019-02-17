/* eslint consistent-return:0 */

require('dotenv').config({ path: './.env' }); // eslint-disable-line global-require
require('dotenv');

const express = require('express');
const { resolve } = require('path');
const setup = require('./middlewares/frontendMiddleware');
const db = require('./config/db');
const server = require('./config/server');
const config = require('./config/config');
const router = require('./routes/router');
const errorHandlerConfig = require('./middlewares/error.middleware');
const responseHandlerConfig = require('./middlewares/response.middleware');
const bunyanLogger = require('./logger/bunyan.logger');
const loggingMiddleWare = require('./middlewares/logging.middleware');
const security = require('./middlewares/security/security.middleware');

const app = express();

// If you need a backend, e.g. an API, add your custom backend-specific middleware here
// app.use('/api', myApi);

// In production we need to pass these values in instead of relying on webpack

db.connect(config);
// APP CONFIG
server.config(app);
// ADDING SECURITY MIDDLEWARE
security.initSecurityMiddleware(app);
// ROUTE CONFIG
router.route(app);
// LOGGING MIDDLEWARE
loggingMiddleWare.initLoggingMiddleWare(app);
// RESPONSE MIDDLEWARE
// responseHandlerConfig.initResponseHandler(app);
// ERROR MIDDLEWARE
errorHandlerConfig.initErrorHandler(app);
setup(app, {
  outputPath: resolve(process.cwd(), 'build'),
  publicPath: '/'
});
// START SERVER
app.set('port', config.server.port);
app.listen(app.get('port'), () => {
  console.log(
    `"Server listening on "${process.pid}" and port "${app.get('port')}`
  );
  bunyanLogger.logInfo(
    `"Server listening on "${process.pid}" and port "${app.get('port')}`
  );
});

app.timeout = 6000000;
process.on('uncaughtException', (err) => {
  bunyanLogger.logError(err, 'Unhandled Exception');
});

process.on('uncaughtRejection', (err, promise) => {
  bunyanLogger.logError(err, 'Unhandled Rejection');
});
