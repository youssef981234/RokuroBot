const Discord = require('discord.js');

module.exports.run = async (bot, message, args) => {
	if (args[1]) message.channel.send(fortunes[Math.floor(Math.random() * fortunes.length)]);
	else message.channel.send("I don't know");
}

module.exports.help = {
	name: "8ball"
}