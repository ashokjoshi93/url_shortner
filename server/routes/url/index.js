const express = require('express');

const router = express.Router();

const testController = require('../../controllers/user/test.controller');


router.route('/shorten')
   .post(testController.url_shortner);

module.exports = router;
