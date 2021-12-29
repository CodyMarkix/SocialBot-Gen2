const Discord = require('discord.js')
const fs = require('fs');
const client = new Discord.Client({intents:[Discord.Intents.FLAGS.GUILDS, Discord.Intents.FLAGS.GUILD_MESSAGES]})
const {Client, Collection, Intents, } = require('discord.js');
const {token} = require('./config.json')
const env = require('dotenv');
const express = require('express');


// Website backend
const app = express();
const exprport = 3000;

app.use(express.static('website'));

app.get('/', function (req, res) {
    res.send(path.resolve(__dirname, "website", "index.html")); // Redirect to the index html
});

app.listen(exprport, () => {
    console.log(`Social Bot listening at http://localhost:${exprport}`);
});

client.once('ready', async () => {
    client.user.setPresence({activities: [{name: "Tento bot je v betě! Nahlasujte bugy na Modmail.", type: "PLAYING" }]})
    console.log('This bot is online')

   

})



client.commands = new Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);

    client.commands.set(command.data.name, command);
}

client.once('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;

	const command = client.commands.get(interaction.commandName);

	if (!command) return;

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
	}
});

client.once('messageCreate', async message =>{
    if(message.author.bot || message.channel.type === 'DM') {
        return
    }
})



client.login(process.env.TOKEN)