const YTDL = require("ytdl-core");
const servers = {};
module.exports = {
  name: "play",
  description: "Play a song.",
  args: true,
  cooldown: 5,
  usage: "<link> or <next>",
  servers: servers,
  execute(message, args) {
    if (!args[0]) {
      message.channel.send("Please provide a link.");
      return;
    }

    if (!YTDL.validateURL(args[0])) {
      message.channel.send("Could not parse a valid video ID.");
      message.channel.send("Be sure to enter the FULL youtube URL.");
      return;
    }

    if (!message.member.voiceChannel) {
      message.channel.send(
        "Connect to the voice channel before requesting a song."
      );
      return;
    }

    if (!servers[message.guild.id])
      servers[message.guild.id] = {
        queue: []
      };

    const server = servers[message.guild.id];
    server.queue.push(args[0]);
    message.channel.send("Song added to queue!");

    if (!message.guild.voiceConnection)
      message.member.voiceChannel.join().then(connection => {
        play(connection, message);
      });

    play = (connection, message) => {
      const stream = YTDL(server.queue[0], {
        filter: "audioonly"
      });
      const streamOptions = { volume: 2 };

      server.dispatcher = connection.playStream(stream, streamOptions);
      server.queue.shift();
      server.dispatcher.on("end", function() {
        if (server.queue[0]) play(connection, message);
        else connection.disconnect();
      });
    };
  }
};
