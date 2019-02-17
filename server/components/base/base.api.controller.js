const { appError } = require('../../models/error.model');
const _ = require('lodash');
// const { sendResponse } = require('../../utils/req.utility');

class BaseAPIController {
  constructor(controller) {
    this.controller = controller;
  }

  async create(req, res, next) {
    try {
      const data = req.body;
      if (_.isEmpty(data)) {
        next(new appError('', 'Empty Object', true));
        return;
      }
      const result = await this.controller.create(data);
      // return sendResponse(res, result, next);
      return res.status(200).json(result);
    } catch (err) {
      next(new appError(err, 'Error occurred'));
    }
  }

  async get(req, res, next) {
    const id = req.params.id;
    const filter = id ? { _id: id } : {};
    try {
      const result = await this.controller.get(filter);

      // return sendResponse(res, result, next);
      return res.status(200).json(result);
    } catch (err) {
      next(new appError(err, 'Error occurred'));
    }
  }

  async update(req, res, next) {
    const filter = {
      _id: req.params.id
    };
    const data = req.body;
    try {
      const result = await this.controller.update(filter, data);
      // return sendResponse(res, result, next);
      return res.status(200).json(result);
    } catch (err) {
      next(new appError(err, 'Error occurred'));
    }
  }

  async delete(req, res, next) {
    try {
      const filter = {
        _id: req.params.id
      };
      const result = await this.controller.delete(filter);
      // return sendResponse(res, result, next);
      return res.status(200).json(result);
    } catch (err) {
      next(new appError(err, 'Error occurred'));
    }
  }
}
module.exports = BaseAPIController;
