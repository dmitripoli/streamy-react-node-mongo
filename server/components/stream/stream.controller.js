const BaseController = require('../base/base.controller');
const StreamModel = require('./stream.model');

class StreamController extends BaseController {
  constructor() {
    super(StreamModel);
  }
}

module.exports.StreamController = StreamController;
