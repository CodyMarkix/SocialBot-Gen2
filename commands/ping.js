const { SlashCommandBuilder} = require('@discordjs/builders')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('replies with pong'),
    async execute(interaction){
        interaction.reply('pongf')
    }


}