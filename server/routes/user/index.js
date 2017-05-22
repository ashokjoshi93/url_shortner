const express = require('express');

const router = express.Router();

const userController = require('../../controllers/user/user.controller');

router.route('/register')
  .post(userController.register);

module.exports = router;
