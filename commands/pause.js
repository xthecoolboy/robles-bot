const play = require('./play.js');

module.exports = {
  name: 'pause',
  description: 'Pause the current song',
  args: false,
  cooldown: 0,
  usage: '',
  execute(message, args) {
    const servers = play.servers;
    const server = servers[message.guild.id];
    if (server.dispatcher) {
      server.dispatcher.pause();
    }
  }
};
