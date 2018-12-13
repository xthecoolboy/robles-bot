module.exports = {
    name: 'stop',
    description: 'Stop playing music.',
    args: false,
    cooldown: 5,
    usage: '',
    execute(message, args) {
        message.guild.voiceConnection.disconnect();
    }
}