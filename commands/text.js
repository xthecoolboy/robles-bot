module.exports = {
    name: 'text',
    description: 'send a text',
    args: true,
    cooldown: 10,
    usage: '<number> <message>',
    execute(message, args) {
        var twilio = require('twilio');

        var client = new twilio(process.env.TWILIO_KEY, process.env.TWILIO_SECRET);

        client.messages.create({
            to: args[0],
            from: process.env.TWILIO_NUMBER,
            body: args.slice(1).join(" ")
        });

        message.channel.send("Message Sent!")
    },
};