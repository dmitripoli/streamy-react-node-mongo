/* CSRF Preventing from Cross-Site Request Forgery */
const cookieParser = require('cookie-parser');
const csurf = require('csurf');
const csrfMiddleware = csurf({
    cookie: true,
});

exports.initCRFMiddleWare = app => {
    // Check for the _csrf token.
    // Check that the token is available in the cookies
    app.use(cookieParser());
    // Check that the _csrf token is present in both the cookies and the request body and that they match
    app.use(csrfMiddleware);
};
