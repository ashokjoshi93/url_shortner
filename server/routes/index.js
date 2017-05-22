const express = require('express');

const userRoutes = require('./user/index');

const router = express.Router();

router.get('/status', (req, res) => {
  res.send('OK');
});

router.get('/test', (req, res) => {
  res.send('OK');
});

router.use('/user', userRoutes);

module.exports = router;
