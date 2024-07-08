const { SlashCommandBuilder } = require('@discordjs/builders');
//const { client } = require('index.js');
module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Replies with Pong!'),
	async execute(interaction) {
		await interaction.reply(`Pong! Bot's ping is \`${client.ws.ping}ms\``);
	},
};
