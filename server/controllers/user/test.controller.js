const Url = require('../../models/url/url.model');

const alphabets = 'abcdefghijkmnpqrstuvwxyz23456789ABCDEFGHJKLMNPQRSTUVWXYZ';
const base = 58;

 // function (output) {
 //    let dbLoc = 0;
 //    for (let i = 0; i < output.length; i++) {
 //      dbLoc = dbLoc * base + alphabets.indexOf(output.charAt(i));
 //    }
 //    return dbLoc;
  // }

module.exports = {
  encode: (dbLoc) => {
    let output = '';

    while (dbLoc > 0) {
      output = alphabets.charAt(dbLoc % base) + output;
      dbLoc = Math.floor(dbLoc / base); // eslint-disable-line
    }
    return output;
  },

  url_shortner: (req, res) => {
    const urlDoc = new Url({ long_url: req.body.long_url });
    urlDoc.save()
    .then((url) => {
      url = url.toObject();
      url.short_url = module.exports.encode(url._id);
      // send res with base_url/encoded_string
      console.log(url);
      res.send({
        url,
      });
    })
    .catch((e) => {
      console.log(e);
    });
  },
};
