'use strict';
const bodyParser = require('body-parser');
exports.config = function(app) {
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
};
