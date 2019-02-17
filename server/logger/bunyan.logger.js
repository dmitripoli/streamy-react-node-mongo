// import { stdSerializers, createLogger } from 'bunyan';
const bunyan = require('bunyan');
const path = require('path');

exports.loggerInstance = () => {
  const loggerConfig = {
    name: 'transaction-notifier',
    serializers: {
      req: require('bunyan-express-serializer'),
      res: bunyan.stdSerializers.res,
      err: bunyan.stdSerializers.err
    },
    streams: []
  };

  process.env.LOG_LEVEL.split(',').forEach((level) => {
    switch (level) {
      case 'info': {
        loggerConfig.streams.push({
          path: path.join(__dirname, '../logs/info.log'),
          type: 'rotating-file',
          period: '1d',
          level: 'info',
          count: 1
        });
        loggerConfig.streams.push({ stream: process.stdout });
        break;
      }
      case 'warn': {
        loggerConfig.streams.push({
          path: path.join(__dirname, '../logs/info.log'),
          type: 'rotating-file',
          period: '1d',
          level: 'warn',
          count: 1
        });
        break;
      }
      case 'error': {
        loggerConfig.streams.push({
          path: path.join(__dirname, '../logs/info.log'),
          type: 'rotating-file',
          period: '1d',
          level: 'error',
          count: 1
        });
        break;
      }
    }
  });
  return bunyan.createLogger(loggerConfig);
};

exports.logResponse = (id, body, statusCode) => {
  const log = this.loggerInstance().child(
    {
      id,
      body,
      statusCode
    },
    true
  );
  log.info('response');
};

exports.logError = (error) => {
  const log = this.loggerInstance();
  log.error(error.stack, error.description);
};

exports.logInfo = (message) => {
  if (process.env.LOG_LEVEL.split(',').includes('info')) {
    const log = this.loggerInstance();
    log.info(message, 'info');
  }
};

exports.logWarn = (message) => {
  if (process.env.LOG_LEVEL.split(',').includes('warn')) {
    const log = this.loggerInstance();
    log.warn(message, 'warn');
  }
};
