const { SlashCommandBuilder } = require('@discordjs/builders');
module.exports = {
    data: new SlashCommandBuilder()
        .setName('monke')
        .setDescription('Sends :monkey_face:'),
    async execute(interaction) {
        await interaction.reply(':monkey_face:');
    },
};
    