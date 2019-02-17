const expressSanitizer = require('express-sanitizer');
const helmetDefault = require('./helmet-default.middleware');
const crf = require('./crf.middleware');
const csp = require('./csp.middleware');
const allowedRequests = ['POST', 'GET', 'PUT', 'DELETE', 'PATCH'];
exports.initSecurityMiddleware = app => {
    helmetDefault.initHelmetMiddleware(app);
    //crf.initCRFMiddleWare(app);
    // csp.initCSPMiddleware(app);
    app.use(expressSanitizer());
    // Restricting only methods currently supported
    app.use((req, res, next) => {
        if (!allowedRequests.find(method => method.toLowerCase() === req.method.toLowerCase())) {
            res.header('Access-Control-Allow-Methods', allowedRequests.join(','));
        }
        next();
    });
};
