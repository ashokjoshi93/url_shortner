const bcrypt = require('bcrypt');

const User = require('../../models/user/user.model');
const authHelper = require('../../helpers/auth/index');
const resGenerator = require('../../response');

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
      userResData.token = authHelper.generateJWT(userResData);
      resGenerator.genrateSuccessRes(res, userResData, 'REGISTRATION_SUCC');
    })
    .catch((err) => {
      // return error
      const emailErrorRegex = /users[.][$]email.*dup key:/g;
      if (emailErrorRegex.test(err.message)) {
        resGenerator.generateErrorRes(res, null, 'REGISTRATION_FAILED_DUP_EMAIL');
      } else {
        resGenerator.generateErrorRes(res, null, 'REGISTRATION_FAILED');
      }
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
          const userResData = user;
          delete userResData.firstName;
          delete userResData.lastName;
          delete userResData.pass;
          resGenerator.genrateSuccessRes(res, userResData, 'LOGIN_SUCC');
        } else {
          resGenerator.generateErrorRes(res, null, 'LOGIN_FAILED');
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
