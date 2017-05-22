const User = require('../../models/user/user.model');
const authHelper = require('../../helpers/auth/generate_jwt');

module.exports = {
  register: (req, res) => {
    const user = new User(req.body);
    user.save((err, userData) => {
      if (err) {
        return res.status(500).send('Could not add the user');
      }
      userData = userData.toObject();
      delete userData.pass;
      res.json({
        user: userData,
        token: authHelper.generate(userData),
      });
    });
  },
};
