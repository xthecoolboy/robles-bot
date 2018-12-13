
module.exports = {
    name: 'call',
    description: 'make a call',
    args: true,
    cooldown: 10,
    usage: '<number> <message>',
    execute(message, args) {
        var twilio = require('twilio');
  
        var client = new twilio(process.env.TWILIO_KEY, process.env.TWILIO_SECRET);

        if (args[0] == '911'){
            return
        }

        client.calls.create({
            url: 'http://twimlets.com/message?Message%5B0%5D=' + args.splice(1).join('%20'),
            to: args[0],
            from: process.env.TWILIO_NUMBER
        });

        message.channel.send("Calling...!")
    },
};