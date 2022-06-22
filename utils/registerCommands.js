const fs = require('node:fs');
const path = require('node:path');
const { Collection } = require('discord.js');
const { REST } = require('@discordjs/rest');

module.exports = async function registerCommands(client) {
    const commands = [];
    client.commands = new Collection();
    const commandsPath = path.join(__dirname, 'commands');
    const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

    for (const file of commandFiles) {
        const filePath = path.join(commandsPath, file);
        const command = require(filePath);
        commands.push(command.data.toJSON());
        client.commands.set(command.data.name, command);
    }

    const rest = new REST({ version: '9' }).setToken(process.env.BOT_TOKEN);

    try {
        await rest.put(Routes.applicationCommands(process.env.APP_ID), { body: commands });
        console.log('Successfully registered application commands.');
    } catch (err) {
        console.error(err);
    }
} 