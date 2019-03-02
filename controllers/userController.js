const db = require('../models');

module.exports = {
  incrementPostCount: user => {
    db.User.findOrCreate({
      where: {
        user: user
      },
      defaults: {
        postCount: 0
      }
    })
      .then(dbUser => {
        db.User.increment('postCount', {
          where: {
            user: user
          }
        });
      })
      .catch(err => {
        if (err) throw err;
      });
  },
  getStats: (user, cb) => {
    db.User.findOne({
      where: {
        user: user
      }
    })
      .then(dbUser => {
        cb(dbUser);
      })
      .catch(err => {
        if (err) throw err;
      });
  }
};
