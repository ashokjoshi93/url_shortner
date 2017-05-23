const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  firstName: 'String',
  lastName: 'String',
  email: { type: String, required: true, unique: true, lowercase: true, trim: true, index: true },
  pass: 'String',
});

const userModel = mongoose.model('User', userSchema);

module.exports = userModel;
