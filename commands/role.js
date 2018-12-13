module.exports = {
    name: 'role',
    description: 'Placeholder',
    args: true,
    usage: '<user> <role>',
    execute(message, args) {
        let reply = `You didn't provide any arguments, ${message.author}!`;
        if (command.usage) {
            reply += `\nThe proper usage would be: \`${prefix}${command.name} ${command.usage}\``;
        }
        return message.channel.send(reply);
    },
};