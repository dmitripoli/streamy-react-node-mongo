const express = require('express');

const router = express.Router();
const ContactApiController = require('./stream.api.controller');

const streamApiController = new ContactApiController();

router
  .post('/', streamApiController.create.bind(streamApiController))
  .patch('/:id', streamApiController.update.bind(streamApiController))
  .get('/', streamApiController.get.bind(streamApiController))
  .get('/:id', streamApiController.get.bind(streamApiController))
  .delete('/:id', streamApiController.delete.bind(streamApiController));

module.exports = router;
