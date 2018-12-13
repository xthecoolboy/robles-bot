var play = require("./play.js");

module.exports = {
    name: 'skip',
    description: 'Skip the current song',
    args: false,
    cooldown: 2,
    usage: '',
    execute(message, args) {
        var servers = play.servers;
        var server = servers[message.guild.id];
        if (server.dispatcher){
            server.dispatcher.end();
        }
        //message.channel.send("This is forever.");
    }
}