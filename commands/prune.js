module.exports = {
    name: 'prune',
    description: 'Delete old messages',
    args: true,
    cooldown: 30,
    usage: '<number>',
    execute(message, args) {
        const amount = parseInt(args[0]) + 1;
        if (!message.member.roles.some(r => ["Administrator", "ayyLmao"].includes(r.name)))
            return message.reply("Sorry, you don't have permissions to use this!");

        if (isNaN(amount)) {
            return message.reply('that doesn\'t seem to be a valid number.');
        } else if (amount <= 1 || amount > 100) {
            return message.reply('you need to input a number between 1 and 99.');
        }
        message.channel.bulkDelete(amount, true).catch(err => {
            console.error(err);
            message.channel.send('TELL AUSTIN SOMETHING MESSED UP!');
        });
    },
};