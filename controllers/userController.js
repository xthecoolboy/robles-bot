const db = require("../models");

module.exports = {
  incrementPostCount: (user, id) => {
    // searched the database for the user. If none exists, create it.
    db.User.findOrCreate({
      where: {
        user: user,
        userId: id
      },
      defaults: {
        postCount: 0
      }
    })
      .then(dbUser => {
        // increments post count
        db.User.increment("postCount", {
          where: {
            user: user,
            userId: id
          }
        });
      })
      .catch(err => {
        if (err) throw err;
      });
  },
  // finds user by their discord ID in the database
  getStats: (id, cb) => {
    db.User.findOne({
      where: {
        userId: id
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
