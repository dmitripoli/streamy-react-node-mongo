const BaseAPIController = require('../base/base.api.controller');
const { StreamController } = require('./stream.controller');

class StreamAPIController extends BaseAPIController {
  constructor() {
    super(new StreamController());
  }
}

module.exports = StreamAPIController;
