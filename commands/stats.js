const userController = require("../controllers/userController");

module.exports = {
  name: "stats",
  description: "Get Your Stats",
  args: false,
  cooldown: 0,
  usage: "<user>",
  execute(message, args) {
    if (!message.mentions.users.size) {
      return userController.getStats(message.author.id, stats => {
        message.channel.send(`<@${stats.userId}>`, {
          embed: {
            color: 3447003,
            author: {
              name: message.author.username,
              icon_url: `${message.author.displayAvatarURL}`
            },
            title: `Server Stats For: @${message.author.username}#${
              message.author.discriminator
            }`,
            fields: [
              {
                name: "Discord ID:",
                value: `${stats.userId}`
              },
              {
                name: "Post Count: ",
                value: `${stats.postCount}`
              },
              {
                name: "Joined: ",
                value: `${stats.createdAt}`
              },
              {
                name: "Last Message: ",
                value: `${stats.updatedAt}`
              }
            ]
          }
        });
      });
    }

    message.mentions.users.map(user => {
      return userController.getStats(user.id, stats => {
        message.channel.send(`<@!${stats.userId}>`, {
          embed: {
            color: 3447003,
            author: {
              name: user.username,
              icon_url: `${user.displayAvatarURL}`
            },
            title: `Server Stats For: @${user.username}#${user.discriminator}`,
            fields: [
              {
                name: "Discord ID:",
                value: `${stats.userId}`
              },
              {
                name: "Post Count: ",
                value: `${stats.postCount}`
              },
              {
                name: "Joined: ",
                value: `${stats.createdAt}`
              },
              {
                name: "Last Message: ",
                value: `${stats.updatedAt}`
              }
            ]
          }
        });
      });
    });
  }
};
