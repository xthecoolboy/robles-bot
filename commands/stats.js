const userController = require('../controllers/userController');

module.exports = {
  name: 'stats',
  description: 'Get Your Stats',
  args: false,
  cooldown: 0,
  usage: '<user>',
  execute(message, args) {
    console.log(message.channel.lastMessage.member.nickname);

    if (!message.mentions.users.size) {
      userController.getStats(message.author.id, stats => {
        return message.channel.send(`<@${stats.user}>`, {
          embed: {
            color: 3447003,
            author: {
              name: message.channel.lastMessage.member.nickname,
              icon_url: `${message.author.displayAvatarURL}`
            },
            title: `Server Stats For: ${
              message.channel.lastMessage.member.nickname
            }`,
            fields: [
              {
                name: 'Discord ID:',
                value: `${stats.user}`
              },
              {
                name: 'Post Count: ',
                value: `${stats.postCount}`
              },
              {
                name: 'Joined: ',
                value: `${stats.createdAt}`
              },
              {
                name: 'Last Message: ',
                value: `${stats.updatedAt}`
              }
            ]
          }
        });
      });
    }
  }
};
