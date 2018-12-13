module.exports = {
    name: 'coinflip',
    description: 'Heads or tails?',
    args: false,
    execute(message, args) {
        var flip = ["Heads", "Tails"];
        var random = flip[Math.floor(Math.random()*flip.length)];
        message.channel.send(random);
    },
};