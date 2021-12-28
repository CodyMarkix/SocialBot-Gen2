const fs = require('fs');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { clientId, guildId } = require('./config.json');

const env = require('dotenv');
const token = process.env.TOKEN;

const commands = [];
const commandFiles = fs.readdirSync('/home/runner/SocialBot/commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`/home/runner/SocialBot/commands/${file}`);
	commands.push(command.data.toJSON());
}