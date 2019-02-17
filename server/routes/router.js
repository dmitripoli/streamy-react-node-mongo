const streamRoutes = require('../components/stream/stream.routes');
const express = require('express');
const path = require('path');
const mime = require('mime-types');

const router = express.Router();
exports.route = (app) => {
  app.use('/api/streams', streamRoutes);
  app.use('/', express.Router());
};
