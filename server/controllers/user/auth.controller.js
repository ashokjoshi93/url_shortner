const User = require('../../models/user/user.model');
const authHelper = require('../../helpers/auth/index');
const bcrypt = require('bcrypt');

module.exports = {
  register: (req, res) => {
    // generate hash for pass
    authHelper.generateHash(req.body.pass)
    .then((passHash) => {
      // override plain password
      req.body.pass = passHash;
      const user = new User(req.body);
      // save in db
      return user.save();
    })
    .then((userData) => {
      // convert mongo obj to js obj
      const userResData = userData.toObject();
      // delete pass
      delete userResData.pass;
      // send res
      res.json({
        user: userResData,
        // generate JWT token
        token: authHelper.generateJWT(userResData),
      });
    })
    .catch((err) => {
      console.error(err.message);
      // return error
      return res.status(500).send('Could not add the user');
    });
  },
  login: (req, res) => {
    User.findOne({ email: req.body.email })
    .then((user) => {
      // this compare is promisified method so have to handle it like promise
      bcrypt.compare(req.body.pass, user.pass)
      .then((isPassCorrect) => {
        if (isPassCorrect) {
          console.info('Login successful');
          res.json({
            userName: user.firstName,
            userEmail: user.email,
          });
        } else {
          console.info('Wrong Password');
        }
      });
    })
    .catch((e) => {
      console.error('Wrong Credentials');
      res.status(500).send({
        message: 'invalid credent',
        isError: true,
      });
    });
  },
};
