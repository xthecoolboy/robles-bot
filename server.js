require('dotenv').config();
const fs = require('fs');
const Discord = require('discord.js');
const db = require('./models');
const userController = require('./controllers/userController');
const postController = require('./controllers/postController');

const prefix = '!';
const token = process.env.DISCORD_TOKEN;
const client = new Discord.Client();
client.commands = new Discord.Collection();
const commandFiles = fs
  .readdirSync('./commands')
  .filter(file => file.endsWith('.js'));
const cooldowns = new Discord.Collection();

//imports each of the commands to be used here
for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.name, command);
}

// connects to the database when the bot is run.
db.sequelize.sync().then(() => {
  client.once('ready', () => {
    console.log('Ready!');
  });
});

// This code block runs when a message is sent in the server
client.on('message', message => {

  // if message is from a bot, return 
  if (message.author.bot) return;

  // sends the author id to the user controller to increment in the db.
  // sends post to db to be saved.
  userController.incrementPostCount(message.author.username, message.author.id);
  postController.savePost(message.author.id, message.content)

  // if message does not start with the prefix, return
  if (!message.content.startsWith(prefix)) return;

  // takes everything after the prefix and command
  const args = message.content.slice(prefix.length).split(/ +/);

  // takes off the command (!ping) and sets it to lowercase
  const commandName = args.shift().toLowerCase();

  // finds whether the entered text is an actual command
  const command =
    client.commands.get(commandName) ||
    client.commands.find(
      cmd => cmd.aliases && cmd.aliases.includes(commandName)
    );

  //if not an actual command, return
  if (!command) return;

  // prevents executiong guild specific commands
  if (command.guildOnly && message.channel.type !== 'text') {
    return message.reply("I can't execute that command inside DMs!");
  }

  // if the command requires arguments, this lets the user know.
  if (command.args && !args.length) {
    let reply = `You didn't provide any arguments, ${message.author}!`;

    if (command.usage) {
      reply += `\nThe proper usage would be: \`${prefix}${command.name} ${
        command.usage
        }\``;
    }

    return message.channel.send(reply);
  }

  // if the command does not have a cool down, set one.
  if (!cooldowns.has(command.name)) {
    cooldowns.set(command.name, new Discord.Collection());
  }

  // gets the current time and the commands cooldown time
  const now = Date.now();
  const timestamps = cooldowns.get(command.name);
  const cooldownAmount = command.cooldown * 1000;

  // if the user is not already on cooldown, set them on cooldown starting now.
  if (!timestamps.has(message.author.id)) {
    timestamps.set(message.author.id, now);
    // Deletes cooldown after specified time
    setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);
  } else {
    // calculate when the cooldown expires
    const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

    // Let the user know how much longer they have, if they are on cooldown.
    if (now < expirationTime) {
      const timeLeft = (expirationTime - now) / 1000;
      return message.reply(
        `please wait ${timeLeft.toFixed(
          1
        )} more second(s) before reusing the \`${command.name}\` command.`
      );
    }

    timestamps.set(message.author.id, now);
    // Deletes cooldown after specified time
    setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);
  }

  // Trys to execute the command. If there was an error, let the user know.
  try {
    command.execute(message, args);
  } catch (error) {
    console.error(error);
    message.reply('there was an error trying to execute that command!');
  }
});

// Create an event listener for new guild members
client.on('guildMemberAdd', member => {
  // Send the message to a designated channel on a server:
  const channel = member.guild.channels.find(ch => ch.name === 'member-log');
  // Do nothing if the channel wasn't found on this server
  if (!channel) return;
  // Send the message, mentioning the member
  channel.send(`Welcome to the server, ${member}`);
});

// Discord Bot Login
client.login(token);
