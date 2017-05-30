const express = require('express');

const authGateway = require('../middlewares/auth_gateway');
const testController = require('../controllers/user/test.controller');
const userRoutes = require('./user/index');
const urlRoutes = require('./url/index');

const router = express.Router();

router.get('/status', (req, res) => {
  res.send('OK');
});

router.use('/user', userRoutes);

router.use('/url', urlRoutes);

// router.route('/test')
// .post(authGateway.validate, testController.test);

module.exports = router;
