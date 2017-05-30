const success = require('./success');
const error = require('./errors');

module.exports = {
  genrateSuccessRes: (res, data, msg) => {
    if (data && msg) {
      res.status(200).json({
        isError: false,
        data,
        msg: success[`${msg}`],
      });
    } else if (data) {
      res.status(200).json({
        isError: false,
        data,
      });
    } else {
      res.status(200).json({
        isError: false,
        msg: success[`${msg}`],
      });
    }
  },

  generateErrorRes: (res, data, msg) => {
    if (data && msg) {
      res.status(500).json({
        isError: true,
        data,
        msg: error[`${msg}`],
      });
    } else if (data) {
      res.status(500).json({
        isError: true,
        data,
      });
    } else {
      res.status(500).json({
        isError: true,
        msg: error[`${msg}`],
      });
    }
  },
};
