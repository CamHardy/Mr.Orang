const { Client, Intents } = require('discord.js');
const registerCommands = require('./utils/registerCommands.js');

require('dotenv').config();

const client = new Client({
    restRequestTimeout: 5000,
    retryLimit: 3,
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_MESSAGE_REACTIONS
    ]
});

registerCommands(client);

client.on('ready', async () => {
    console.log('Mr. Orang has logged on');  
});

client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;

    const command = client.commands.get(interaction.commandName);

	if (!command) return;

	try {
		await command.execute(interaction);
	} catch (err) {
		console.error(err.toString());
        console.log(`Error stack trace: ${err.stack}`);
		await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
	}
});

client.on('error', (err) => {
    console.log(`Caught error from discord client: ${err.toString()}`);
    console.log(`Error stack trace: ${err.stack}`);
});

client.login(process.env.BOT_TOKEN)
    .catch((err) => {
        console.error(err)
    });