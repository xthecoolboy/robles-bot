const axios = require('axios');
const Discord = require('discord.js');

module.exports = {
  name: 'apex',
  description: 'Get Your Stats',
  args: false,
  cooldown: 0,
  usage: '<user>',
  execute(message, args) {
    const url = `https://public-api.tracker.gg/apex/v1/standard/profile/5/${
      args[0]
    }`;

    const options = {
      headers: {
        'TRN-Api-Key': process.env.APEX_KEY
      }
    };

    if (args[0] != 'set')
      axios
        .get(url, options)
        .then(stats => {
          const embed = new Discord.RichEmbed();

          embed.setColor(0xff0000);

          embed.setTitle(
            `Apex Legends Stats For ${
              stats.data.data.metadata.platformUserHandle
            }`
          );

          stats.data.data.stats.map(stat => {
            embed.addField(
              stat.metadata.name,
              `${stat.value} ${
                stat.percentile ? '(Top ' + stat.percentile + '%)' : ''
              }`
            );
          });

          if (stats.status == 200) {
            message.channel.send({ embed });
          } else {
            message.channel.send(`Apex user "${args[0]}" does not exist.`);
          }
        })
        .catch(error => {
          if (error.response) {
            message.channel.send(error.response.data.errors[0].message);
          }
        });
  }
};
