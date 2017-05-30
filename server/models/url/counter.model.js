const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const counterSchema = new Schema({
  _id: { type: String },
  seq: { type: Number, default: 0 },
});

const counterModel = mongoose.model('Counter', counterSchema);

module.exports = counterModel;
