module.exports = {
    name: 'upset',
    aliases: ['mad', 'cade'],
    description: 'make someone angry',
    args: true,
    cooldown: 10,
    usage: '<user> <number>',
    execute(message, args) {

        const amount = parseInt(args[1]) + 1;
        if (isNaN(amount)) {
            return message.reply('that doesn\'t seem to be a valid number.');
        } else if (amount <= 1 || amount > 20) {
            return message.reply('you need to input a number between 1 and 19.');
        }

        if (!message.mentions.users.size) {
            return message.channel.send(`????`);
        }
        const taggedUser = message.mentions.users.first();
        const memberID = taggedUser.id;
        for (let i = 0; i < amount; i++){
            message.channel.send(`<@${memberID}> is gonna be mad!`);
        }
    },
};