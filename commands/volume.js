const Discord = require('discord.js');
const bot = new Discord.Client();
const fs = require('fs');
const ytapi = require('C:/Users/risea/Desktop/ClumsyBot.js/MusicStuff.js');
const botSettings = require("C:/Users/risea/Desktop/ClumsyBot.js/botSettings.json")
const prefix = botSettings.prefix;
const YTDL = require('ytdl-core');
var ffmpeg = require('ffmpeg');

var nowplaying = {};
var volume = {};
var servers = {};

function play(connection, message) {
    var server = servers[message.guild.id];

    nowplaying[message.guild.id] = server.queue.shift();

    var video = nowplaying[message.guild.id];

    var embed = new Discord.RichEmbed()
        .setAuthor("Music")
        .setColor([0, 255, 255])
        .setDescription("**Now Playing:**\n" + video.title)
        .setThumbnail(video.thumbnail)
    message.channel.send(embed);
	
    server.dispatcher = connection.playStream(YTDL(video.url, { filter: "audioonly" }));
    if (volume[message.guild.id])
        server.dispatcher.setVolume(volume[message.guild.id]);

    server.dispatcher.on("end", function () {
        nowplaying[message.guild.id] = null;
        if (server.queue.length > 0)
            play(connection, message);
        else {
            connection.disconnect();
            server.dispatcher = null;
        }
    });
}

module.exports.run = async (bot, message, args) => {
if (!args[1]) {
                var embed = new Discord.RichEmbed()
                    .setAuthor("Music")
                    .setColor([0, 255, 255])
                    .setDescription(`**Usage:** ${PREFIX}volume <volume>`)
                message.channel.send(embed);
                return;
            }

            if (args[1] < 0 || args[1] > 100) {
                message.channel.send("Invalid Volume! Please provide a volume from 0 to 100.");
                return;
            }

            volume[message.guild.id] = Number(args[1]) / 100;
            var server = servers[message.guild.id];
            if (server.dispatcher) {
                server.dispatcher.setVolume(volume[message.guild.id]);
                message.channel.send(`Volume set: ${args[1]}%`);
            }
}

module.exports.help = {
	name: "volume"
}