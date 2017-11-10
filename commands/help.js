const Discord = require('discord.js');

module.exports.run = async (bot, message, args) => {
	message.author.send("```;play - Plays music, ;help - Shows this message, ;stop - Stops music, ;skip - Skips song, ;ping - Responds with Pong!, ;shutdown - Shutsdown bot(Only works if you are Clumsy), ;author - Shows Credits, ;8ball - Responds with your fortune```");
}

module.exports.help = {
	name: "help"
}