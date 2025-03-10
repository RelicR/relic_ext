const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { token } = process.env.DISCORD_TOKEN;
const fs = require('node:fs');

const commands = [];
const commandFiles = fs.readdirSync('./src/commands').filter(file => file.endsWith('.js'));

// Place your client and guild ids here
const clientId = process.env.DISCORD_clientId;
const guildId = process.env.DISCORD_guildId;

for (const file of commandFiles) {
	const command = require(`./src/commands/${file}`);
	commands.push(command.data.toJSON());
}

const rest = new REST({ version: '9' }).setToken(token);

(async () => {
	try {
		console.log('Started refreshing application (/) commands.');

		await rest.put(
			Routes.applicationGuildCommands(clientId, guildId),
			{ body: commands },
		);

		console.log('Successfully reloaded application (/) commands.');
	} catch (error) {
		console.error(error);
	}
})();