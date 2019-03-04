const db = require('../models');

module.exports = {
  incrementPostCount: user => {
    // searched the database for the user. If none exists, create it.
    db.User.findOrCreate({
      where: {
        user: user
      },
      defaults: {
        postCount: 0
      }
    })
      .then(dbUser => {
        // increments post count
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
  // finds user by their discord ID in the database
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
