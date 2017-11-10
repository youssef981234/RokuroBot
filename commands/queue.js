const Discord = require('discord.js');
var nowplaying = {};
var volume = {};
var servers = {};

module.exports.run = async (bot, message, args) => {
if (nowplaying[message.guild.id]) {
                var video = nowplaying[message.guild.id];
                var server = servers[message.guild.id];
                var desc = `**Now Playing:**\n${video.title}\n\n`;
                for (var i = 0; i < server.queue.length; i++) {
                    if (i == 0) {
                        desc = desc + "**Queue:**\n";
                        desc = desc + `**${i + 1}.** ${server.queue[i].title}\n`;
                    }
                    else {
                        desc = desc + `**${i + 1}.** ${server.queue[i].title}\n`;
                    }
                }
                var embed = new Discord.RichEmbed()
                    .setAuthor("Music")
                    .setColor([0, 255, 255])
                    .setDescription(desc)
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
	name: "queue"
}