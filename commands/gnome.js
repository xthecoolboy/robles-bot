const YTDL = require('ytdl-core');

var servers = {};
module.exports = {
  name: 'gnome',
  description: 'Gnome a voice channel',
  args: false,
  cooldown: 5,
  usage: '!gnome',
  servers: servers,
  execute(message, args) {
    if (!message.member.voiceChannel) {
      message.channel.send('Connect to the voice channel before Gnoming.');
      return;
    }

    if (!servers[message.guild.id])
      servers[message.guild.id] = {
        queue: []
      };

    const server = servers[message.guild.id];
    console.log(server.dispatcher);
    server.queue.push(args[0]);

    if (!message.guild.voiceConnection)
      message.member.voiceChannel.join().then(connection => {
        play(connection);
      });

    play = connection => {
      server.dispatcher = connection.playStream(
        YTDL('https://www.youtube.com/watch?v=6n3pFFPSlW4', {
          filter: 'audioonly'
        })
      );
      server.queue.shift();
      server.dispatcher.on('end', function() {
        connection.disconnect();
      });
    };
  }
};
