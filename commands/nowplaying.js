const Discord = require('discord.js');
var nowplaying = {};
var volume = {};
var servers = {};

module.exports.run = async (bot, message, args) => {

            	if (nowplaying[message.guild.id]) {
                	var video = nowplaying[message.guild.id];
                	var embed = new Discord.RichEmbed()
                    	.setAuthor("Music")
                    	.setColor([0, 255, 255])
                    	.setDescription("**Now Playing:**\n" +
                    	video.title)
                    	.setThumbnail(video.thumbnail)
                	message.channel.send(embed);
            	}
            	else {
                	var embed = new Discord.RichEmbed()
                    	.setAuthor("Music")
                    	.setColor([0, 255, 255])
                    	.setDescription("No music is playing.")
                	message.channel.send(embed);
            	}
}

module.exports.help = {
	name: "nowplaying"
}