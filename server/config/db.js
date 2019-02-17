'use strict';
const mongoose = require('mongoose');
const bunyanLogger = require('../logger/bunyan.logger');

exports.connect = function(config) {
    const handleConnection = () => {
        bunyanLogger.logInfo(`Connecting to database ${config.db.url}`);
        mongoose.set('useCreateIndex', true);
        mongoose.connect(
            config.db.url,
            { useNewUrlParser: true }
        );
    };
    handleConnection();
    // Error handler
    mongoose.connection.on('error', function(err) {
        bunyanLogger.logError(err, 'connection failed');
    });

    // Reconnect when closed
    mongoose.connection.on('disconnected', function() {
        handleConnection();
    });

    // If the Node process ends, close the Mongoose connection
    process.on('SIGINT', function() {
        mongoose.connection.close(function() {
            bunyanLogger.logInfo('Mongoose default connection disconnected through app termination');
            process.exit(0);
        });
    });
};
