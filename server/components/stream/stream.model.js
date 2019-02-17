const mongoose = require('mongoose');

const StreamSchema = new mongoose.Schema({
  title: {
    type: String,
    required: 'Enter a title'
  },
  description: {
    type: String,
    required: 'Enter a description'
  },
  userId: {
    type: String
  }
});

const Stream = mongoose.model('Stream', StreamSchema);

module.exports = Stream;
