const Discord = require('discord.js');

module.exports.run = async (bot, message, args) => {
var embed = new Discord.RichEmbed()
                    .setAuthor("Ping")
                    .setColor([0, 255, 255])
                    .setDescription("**Rokuro's Ping **\n" + bot.ping)
                message.channel.send(embed);
}

module.exports.help = {
	name: "ping"
}