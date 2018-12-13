require('dotenv').config()
const fs = require('fs');
const Discord = require('discord.js');
// const {
	// prefix,
	// token
// } = require('./config.json');

const prefix = "!";
const token = process.env.DISCORD_TOKEN;

const util = require('util')

const client = new Discord.Client();
client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
const cooldowns = new Discord.Collection();


for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}

client.once('ready', () => {
	console.log('Ready!');
});

client.on('message', message => {
	if (message.content.toLowerCase().includes("yeet") && !message.author.bot){
		return message.reply('stop');
	}
	if (message.content.toLowerCase().includes("cade") && !message.author.bot){
		return message.reply('Cade? I heard that guy is pretty angry.');
	}
	if (message.content.toLowerCase().includes("bnj") && !message.author.bot){
		const loc = ["Blackrock New Jersey Municipal Income Trust","Bailie Nicol Jarvie","Babcock & Jenkins", "Bonn, Germany - Train Main Railroad Station", "British Numismatic Journal", "Battleship New Jersey", "Wailing Woods", "Brand Name Justification", "Bayesian Networks Tools in Java", "Butt Nut Jacob", "Rio Robles Cafe", "Still Bad LMAO", "Salty Springs", "ouch", "Calling Jacob...", "SENDING _1000 TEXT MESSAGES TO Nick"];
        const random = loc[Math.floor(Math.random()*loc.length)];
        return message.channel.send("Did you mean: " + random + "?");
	}
	if (message.content.toLowerCase().includes("content") && !message.author.bot){
		console.log(util.inspect(message.author.username));
	}
	if (!message.content.startsWith(prefix) || message.author.bot) return;

	const args = message.content.slice(prefix.length).split(/ +/);
	const commandName = args.shift().toLowerCase();
	const command = client.commands.get(commandName) ||
		client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

	if (!command) return;

	if (command.guildOnly && message.channel.type !== 'text') {
		return message.reply('I can\'t execute that command inside DMs!');
	}

	if (command.args && !args.length) {
		let reply = `You didn't provide any arguments, ${message.author}!`;

		if (command.usage) {
			reply += `\nThe proper usage would be: \`${prefix}${command.name} ${command.usage}\``;
		}

		return message.channel.send(reply);
	}

	if (!cooldowns.has(command.name)) {
		cooldowns.set(command.name, new Discord.Collection());
	}

	const now = Date.now();
	const timestamps = cooldowns.get(command.name);
	const cooldownAmount = (command.cooldown) * 1000;

	if (!timestamps.has(message.author.id)) {
		timestamps.set(message.author.id, now);
		setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);
	} else {
		const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

		if (now < expirationTime) {
			const timeLeft = (expirationTime - now) / 1000;
			return message.reply(`please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${command.name}\` command.`);
		}

		timestamps.set(message.author.id, now);
		setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);
	}

	try {
		command.execute(message, args);
	} catch (error) {
		console.error(error);
		message.reply('there was an error trying to execute that command!');
	}
});

client.login(token);


//Message Object:
/*
Message {
  channel:
   TextChannel {
     type: 'text',
     deleted: false,
     id: '463125172598210581',
     name: 'fork-knife',
     position: 5,
     parentID: '463124967534362664',
     permissionOverwrites: Collection {},
     topic: null,
     nsfw: false,
     lastMessageID: '522670686515232770',
     guild:
      Guild {
        members: [Object],
        channels: [Object],
        roles: [Object],
        presences: [Object],
        deleted: false,
        available: true,
        id: '463111044630577164',
        name: 'Valley Vape Boys',
        icon: '864286fe6e5a27fa0db68c69b618e893',
        splash: null,
        region: 'us-west',
        memberCount: 12,
        large: false,
        features: [],
        applicationID: null,
        afkTimeout: 1800,
        afkChannelID: '463113405683728406',
        systemChannelID: '463111044630577167',
        embedEnabled: undefined,
        verificationLevel: 0,
        explicitContentFilter: 0,
        mfaLevel: 0,
        joinedTimestamp: 1541136706531,
        defaultMessageNotifications: 'MENTIONS',
        ownerID: '226939521508311041',
        _rawVoiceStates: [Object],
        emojis: Collection {} },
     messages:
      Collection {
        '522670671894151169' => [Object],
        '522670686515232770' => [Circular] },
     _typing: Map { '226939521508311041' => [Object] },
     lastMessage: [Circular] },
  deleted: false,
  id: '522670686515232770',
  type: 'DEFAULT',
  content: 'content',
  author:
   User {
     id: '226939521508311041',
     username: 'NILBOG',
     discriminator: '6249',
     avatar: 'd0133126b8fae5cc3d4df5f898df0770',
     bot: false,
     lastMessageID: '522670686515232770',
     lastMessage: [Circular] },
  member:
   GuildMember {
     guild:
      Guild {
        members: [Object],
        channels: [Object],
        roles: [Object],
        presences: [Object],
        deleted: false,
        available: true,
        id: '463111044630577164',
        name: 'Valley Vape Boys',
        icon: '864286fe6e5a27fa0db68c69b618e893',
        splash: null,
        region: 'us-west',
        memberCount: 12,
        large: false,
        features: [],
        applicationID: null,
        afkTimeout: 1800,
        afkChannelID: '463113405683728406',
        systemChannelID: '463111044630577167',
        embedEnabled: undefined,
        verificationLevel: 0,
        explicitContentFilter: 0,
        mfaLevel: 0,
        joinedTimestamp: 1541136706531,
        defaultMessageNotifications: 'MENTIONS',
        ownerID: '226939521508311041',
        _rawVoiceStates: [Object],
        emojis: Collection {} },
     user:
      User {
        id: '226939521508311041',
        username: 'NILBOG',
        discriminator: '6249',
        avatar: 'd0133126b8fae5cc3d4df5f898df0770',
        bot: false,
        lastMessageID: '522670686515232770',
        lastMessage: [Circular] },
     joinedTimestamp: 1530484677294,
     _roles: [ '507789175005773835', '510712172058509313' ],
     serverDeaf: false,
     serverMute: false,
     selfMute: undefined,
     selfDeaf: undefined,
     voiceSessionID: undefined,
     voiceChannelID: undefined,
     speaking: false,
     nickname: 'limp ice',
     lastMessageID: '522670686515232770',
     lastMessage: [Circular],
     deleted: false },
  pinned: false,
  tts: false,
  nonce: '522670690181054464',
  system: false,
  embeds: [],
  attachments: Collection {},
  createdTimestamp: 1544684802417,
  editedTimestamp: null,
  reactions: Collection {},
  mentions:
   MessageMentions {
     everyone: false,
     users: Collection {},
     roles: Collection {},
     _content: 'content',
     _client:
      Client {
        domain: null,
        _events: [Object],
        _eventsCount: 6,
        _maxListeners: 10,
        options: [Object],
        rest: [Object],
        dataManager: [Object],
        manager: [Object],
        ws: [Object],
        resolver: [Object],
        actions: [Object],
        voice: [Object],
        shard: [Object],
        users: [Object],
        guilds: [Object],
        channels: [Object],
        presences: Collection {},
        user: [Object],
        readyAt: 2018-12-13T07:06:37.327Z,
        broadcasts: [],
        pings: [Array],
        _timeouts: [Object],
        _intervals: [Object],
        commands: [Object] },
     _guild:
      Guild {
        members: [Object],
        channels: [Object],
        roles: [Object],
        presences: [Object],
        deleted: false,
        available: true,
        id: '463111044630577164',
        name: 'Valley Vape Boys',
        icon: '864286fe6e5a27fa0db68c69b618e893',
        splash: null,
        region: 'us-west',
        memberCount: 12,
        large: false,
        features: [],
        applicationID: null,
        afkTimeout: 1800,
        afkChannelID: '463113405683728406',
        systemChannelID: '463111044630577167',
        embedEnabled: undefined,
        verificationLevel: 0,
        explicitContentFilter: 0,
        mfaLevel: 0,
        joinedTimestamp: 1541136706531,
        defaultMessageNotifications: 'MENTIONS',
        ownerID: '226939521508311041',
        _rawVoiceStates: [Object],
        emojis: Collection {} },
     _members: null,
     _channels: null },
  webhookID: null,
  hit: null,
  _edits: [] }
*/