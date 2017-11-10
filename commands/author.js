const Discord = require('discord.js');

module.exports.run = async (bot, message, args) => {
	var embed = new Discord.RichEmbed()
    	.setAuthor("Author")
        .setColor([0, 255, 255])
        .setDescription("I was made by Clumsy#4198, if you have issues with bot DM me :D")
        message.channel.send(embed);
}

module.exports.help = {
	name: "author"
}