const mongoose = require('mongoose');
const Counter = require('./counter.model');

const Schema = mongoose.Schema;

const urlSchema = new Schema({
  _id: { type: Number, index: true },
  long_url: String,
  created_at: { type: Date, default: new Date() },
});

urlSchema.pre('save', function (next) {
  Counter.findByIdAndUpdate({ _id: 'counter' }, { $inc: { seq: 1 } })
  .then((counterDoc) => {
    console.log(JSON.stringify(counterDoc.seq, null, 2));
    const dbDoc = this;
    this._id = counterDoc.seq;
    console.log(this);
    next();
  })
  .catch(e => next(e));
});

const urlModel = mongoose.model('Url', urlSchema);

module.exports = urlModel;
