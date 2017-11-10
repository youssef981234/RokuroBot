const Discord = require('discord.js');

const botSettings = require("./botSettings.json")

const bot = new Discord.Client();

const prefix = botSettings.prefix;

const YTDL = require('ytdl-core');

const fs = require('fs');

var ffmpeg = require('ffmpeg');

var fourtunes = {
	"Yes",
	"No",
	"It's up to you man"
}

bot.commands = new Discord.Collection();

fs.readdir("./commands/", (err, files) => {
	if(err) console.error(err);
	
	let jsfiles = files.filter(f => f.split(".").pop() === "js");
	if(jsfiles.length <= 0) {
		console.log("No Commands")
		return;
	}
	
	console.log(`Loading ${jsfiles.length} commands!`);
	
	jsfiles.forEach((f, i) => {
		let props = require(`./commands/${f}`);
		console.log(`${i + 1}: ${f} loaded!`);
		bot.commands.set(props.help.name, props);
	});
});

bot.on("ready", () => {
	console.log("bot stats: Online!");
	bot.user.setPresence({ game: { name:';Help', type: 0 } });
});

bot.on('message', async message => {
	
	if(message.author.bot) return;
	if(message.channel.type == "dm") return;

	let messageArray = message.content.slice(/\s+/g)
	let command = messageArray[0]
	let args = messageArray.slice(2)

	if(!message.content.startsWith(prefix)) return;

	let cmd = bot.commands.get(command.slice(prefix.length))
	if(cmd) cmd.run(bot, message, args);
	
});

bot.login(botSettings.token);
