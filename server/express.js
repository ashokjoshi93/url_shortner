const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const config = require('../config');
const routes = require('./routes');
const bluebird = require('bluebird');

const app = express();

// parse body params and attache them to req.body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cookieParser());

// disable 'X-Powered-By' header in response
app.disable('x-powered-by');

// enable CORS - Cross Origin Resource Sharing

// enable detailed API logging in dev env
// db connection
mongoose.connect(config.db);
mongoose.Promise = bluebird;
// mount all routes on api/v1.0 path
app.use('/api/v1.0', routes);

// log error in winston transports except when executing stage suite
// error handler, send stacktrace only during development
app.use((err, req, res, next) => {       // eslint-disable-line no-unused-vars
  res.status(err.status).json({
    message: err.isPublic ? err.message : err.status,
    stack: config.env === 'development' ? err.stack : {},
  });
});

module.exports = app;
