const Discord = require('discord.js');

module.exports.run = async (bot, message, args) => {
if (message.author.id !== "208336509202464768"){
				return;
			} else{
				bot.destroy()
			}
}

module.exports.help = {
	name: "shutdown"
}