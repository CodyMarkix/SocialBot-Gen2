const { SlashCommandBuilder } = require('@discordjs/builders');
module.exports = {
    data: new SlashCommandBuilder()
        .setName('sinfo')
        .setDescription('Info o serveru'),
    async execute(interaction) {
        await interaction.reply('Hello? Are we here?');
    },
};