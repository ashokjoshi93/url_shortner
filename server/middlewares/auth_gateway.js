const config = require('../../config/env/development');
const jwt = require('jsonwebtoken');

module.exports = {
  validate: (req, res, next) => {
    const token = req.headers.authorization;
    if (token) {
      jwt.verify(token, config.secret, (err, user) => {
        if (err) {
          res.send('Invalid Token');
        } else {
          console.log(user);
          req.user = user;
          next();
        }
      });
    } else {
      res.send('Please send a token');
    }
  },
};
