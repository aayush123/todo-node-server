const dao = require('../dao/dao');
const bcrypt = require('bcrypt-nodejs');

function validateRequest(username, clientToken) {
  return new Promise(function(resolve, reject) {
    dao.findOne({username}, 'users')
    .then((userFromDB) => {
      if (bcrypt.compareSync(userFromDB._id, clientToken)) {
        resolve(true);
      } else {
        reject('Invalid clientToken');
      }
    })
    .catch((err) => {
      reject(err);
    });
  });
}
