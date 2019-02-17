'use strict';
// CUSTOM ERROR CLASS
class AppError {
    constructor(commonType, description) {
        Error.call(this);
        Error.captureStackTrace(this);
        this.commonType = commonType;
        this.description = `${description || ''} : ${commonType.message}`;
    }
}

module.exports = {
    AppError,
};
