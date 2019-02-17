/*Content-Security-Policy header is effectively a whitelist of things that are allowed to be on your page.*/
const csp = require('helmet-csp');
const NONE = '\'none\'';
const SELF = '\'self\'';
const UNSAFE_INLINE = '\'unsafe-inline\'';
const UNSAFE_EVAL = '\'unsafe-eval\'';
const DATA = 'data:';

module.exports.initCSPMiddleware = app => {
    app.use(
        csp({
            directives: {
                defaultSrc: [NONE],
                scriptSrc: [SELF, UNSAFE_INLINE, UNSAFE_EVAL],
                styleSrc: [SELF, UNSAFE_INLINE],
                fontSrc: [SELF, DATA],
                imgSrc: [SELF, DATA],
                mediaSrc: [NONE],
                connectSrc: [SELF],
                frameSrc: [NONE],
                workerSrc: [NONE],
                requireSriFor: ['style'],
                upgradeInsecureRequests: true,
            },
            reportOnly: false,
            setAllHeaders: false,
            disableAndroid: false,
            browserSniff: false,
        })
    );
};
