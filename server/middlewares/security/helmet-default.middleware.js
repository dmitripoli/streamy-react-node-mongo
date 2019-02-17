const helmet = require('helmet');
exports.initHelmetMiddleware = app => {
    // X-DNS-Prefetch-Control = off  // disable browsers’ DNS prefetching
    // X-Frame-Options = SAMEORIGN  // will prevent anyone from putting this page in an iframe unless it’s on the same origin
    // X-Powered-By // removes this header from the browser to make it harder to see what potentially-vulnerable technology powers your site.
    // Strict-Transport-Security - keep your users on HTTPS.
    // X-Download-Options  = no open // prevent IE from executing downloads in your site’s context
    // X-Content-Type-Options =  nosniff // tells browsers not to sniff MIME types - trust what the server says and block the resource if it’s wrong
    // X-XSS-Protection =1, mode = block | 0 // prevent from Reflected XSS attack
    app.use(helmet());
};
