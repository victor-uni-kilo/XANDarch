const mongoose = require('mongoose');

const imagesSchema = new mongoose.Schema({
  fieldname: { type: String },
  originalname: { type: String },
  encoding: { type: String },
  originalname: { type: String },
  originalname: { type: String },
  originalname: { type: String },
  originalname: { type: String },
  originalname: { type: String },
  originalname: { type: String },
});

module.exports = mongoose.model('Images', imagesSchema);

