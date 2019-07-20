const db = require('../models');

module.exports = {
    savePost: (user, text) => {
        db.Post.create({
            userId: user,
            text: text
        }).catch(err => {
            if (err) throw err;
        });
    }
};
