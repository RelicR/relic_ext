const { SlashCommandBuilder, PermissionFlagsBits, messageLink } = require('discord.js');
const msgs = { 1:"сообщение", 2:"сообщения", 3:"сообщения", 4:"сообщения", 5:"сообщений", 7:"сообщений", 8:"сообщений", 9:"сообщений", 0:"сообщений" };
var reply = "";
var counter = 0;

module.exports = {
	data: new SlashCommandBuilder()
		.setName('clear')
		.setDescription('Удаляет сообщения.')
		.addStringOption(option =>
			option
				.setName('amount')
				.setDescription('Количество сообщений для удаления')
                .setRequired(true))
        //.setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages)
		.setDMPermission(false),
    //async execute(interaction) {
    async execute(interaction) {
        const amount = interaction.options.getString('amount') ?? 'Не передано количество сообщений для удаления';
        if(!interaction.memberPermissions.has(PermissionFlagsBits.ManageMessages)) await interaction.reply('У Вас нет доступа к данному действию');
        else{
            if(!Number(amount)) await interaction.reply('Передан неверный аргумент');
            else{
                await interaction.channel.fetch({limit: Number(amount)}).then(messages =>{
                    interaction.channel.bulkDelete(Number(amount), true);
                });
                reply = `Я удалила ${amount} ${msgs[amount%10]}`;
                await interaction.reply(reply);
            };
        };       
    },
};