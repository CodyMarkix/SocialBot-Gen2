// Importing libraries
const fs = require("fs");
const path = require("path");
const express = require('express');
const env = require('dotenv');
const { Client, Collection, Intents } = require('discord.js');

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

// New Discord Client
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

// When the client is ready, it will console.log.
client.once('ready', () => {
	console.log('SocialBot is ready!');
});

client.commands = new Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
    const command = require(`./commands/${file}`)
    client.commands.set(command.data.name, command);
}

// Command handler
client.on('interactionCreate', async interaction => {
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

// Logging in the bot
client.login(process.env.TOKEN);