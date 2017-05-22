const jwt = require('jsonwebtoken');
const config = require('../../../config/env/development');

module.exports = {
  generate: (user) => {
    const token = jwt.sign(user, config.secret, {
      expiresIn: 5000,
    });
    return token;
  },
};
