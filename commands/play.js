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
		.setDescription(`**Usage:** ${prefix}play <link/search query>`) 
		message.channel.send(embed);
		return;
	}

	if (!message.member.voiceChannel) {
		message.channel.send("You must be in a voice channel");
		return;
	}

	if (!servers[message.guild.id])
		servers[message.guild.id] = {
		queue: []
	};

	var server = servers[message.guild.id];
	var search;

	if (args[1].toLowerCase().startsWith('http'))
		search = args[1];
		else
		search = message.content.substring(prefix.length + args[0].length + 1);

		ytapi.getVideo(search).then(function (video) {

		server.queue.push(video);

	if (server.dispatcher) {
		if (server.queue.length > 0) {
			var embed = new Discord.RichEmbed()
			.setAuthor("Music")
			.setColor([0, 255, 255])
			.setDescription("**Added to queue:**\n" + video.title)
			.setThumbnail(video.thumbnail)
			message.channel.send(embed);
		}
	}

	if (!message.guild.voiceConnection) message.member.voiceChannel.join().then(function (connection) {
		if (!server.dispatcher)
			play(connection, message);
	})
	else {
		if (!server.dispatcher)
			play(message.guild.voiceConnection, message);
		}
	});	
	
	}

module.exports.help = {
	name: "play"
}