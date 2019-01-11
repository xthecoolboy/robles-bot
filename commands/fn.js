const Fortnite = require("fortnite-api");
const moment = require("moment");
var Discord = require('discord.js');
module.exports = {
    name: 'fn',
    description: 'Lifetime solo stats',
    args: false,
    cooldown: 10,
    usage: '<user>',
    execute(message, args) {
        async function robles(message) {

            await message.delete();

            const filter = m => m.author.id === message.author.id;
            message.reply("Please chose a username... Will expire in 10 seconds...").then(q => q.delete(15000))
            message.channel.awaitMessages(filter, {
                max: 1,
                time: 10000
            }).then(collected => {
                collected.delete(15000);
                if (collected.first().content === 'cancel') {
                    return message.reply("Canceled.");
                }
                let fortniteAPI = new Fortnite(
                    [
                        process.env.FORTNITE_EMAIL,
                        process.env.FORTNITE_PASS,
                        process.env.FORTNITE_CLIENT,
                        process.env.FORTNITE_SECRET,
                    ], {
                        debug: true
                    }
                );

                let username = collected.first().content;
                fortniteAPI.login().then(() => {

                    fortniteAPI.getStatsBR(username, 'pc').then(stats => {
                        console.log(stats)
                        // let embed = new Discord.RichEmbed()
                        //     .setTitle("**" + username + "**")
                        //     .setColor("BLURPLE")
                        //     .setDescription("Lifetime Stats")
                        //     .setThumbnail(message.author.displayAvatarURL)
                        //     .addField("Wins", stats.lifetimeStats.wins, true)
                        //     .addField("Top 10s", stats.lifetimeStats.top10s, true)
                        //     .addField("Top 25s", stats.lifetimeStats.top25s, true)
                        //     .addField("Win/Lose", stats.lifetimeStats['win%'] + "%", true)
                        //     .addField("Kills", stats.lifetimeStats.kills, true)
                        //     .addField("K/D", stats.lifetimeStats['k/d'], true)
                        //     .addField("Matches", stats.lifetimeStats.matches, true)
                        //     .addField("Kills Per Match", stats.lifetimeStats.killsPerMatch, true)
                        //     .addField("Score", stats.lifetimeStats.score, true)
                        //     .addField("Last Updated", moment.unix(stats.lifetimeStats.lastModified).format('MMMM Do YYYY, h:mm:ss a'), true);
                        // return message.channel.send(embed);
                    }).catch(err => {
                        console.log(err);
                        message.reply("Could not find user... Double check spelling " + err).then(r => r.delete(5000));
                    });
                });
            }).catch(err => {
                message.reply("Cancelled...").then(r => r.delete(5000));
                console.log("Time exceeded. Message await cancelled.");
            });

        }
        robles(message);
    },
};
