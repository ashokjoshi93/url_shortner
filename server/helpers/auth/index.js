const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const config = require('../../../config/env/development');

module.exports = {
  generateJWT: (user) => {
    const token = jwt.sign(user, config.secret, {
      expiresIn: 5000,
    });
    return token;
  },

  generateHash: pass => new Promise((resolve, reject) => {
    const saltRounds = 10;
    bcrypt.hash(pass, saltRounds)
    .then((hash) => {
      resolve(hash);
    })
    .catch((err) => {
      reject(err);
    });
  }),
};
