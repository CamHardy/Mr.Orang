const { SlashCommandBuilder } = require('@discordjs/builders');
const { Configuration, OpenAIApi } = require('openai');
const Filter = require('bad-words');

const bannedWords = require('../lib/bannedWords.js');

const badWordFilter = new Filter();
badWordFilter.addWords(...bannedWords);

const configuration = new Configuration({
    apiKey: process.env.OPENAIAPIKEY
});
const openai = new OpenAIApi(configuration);

const DEFAULT_TEMP = 0.9;
const DEFAULT_MAX_TOKENS = 300;
const DEFAULT_AI_MODEL = 'text-davinci-002';
const DEFAULT_TIMEOUT = 1000 * 30;

async function handleGPT3(interaction) {
    const prompt = interaction.options.getString('prompt').trim();

    if (badWordFilter.isProfane(prompt)) {
        await interaction.reply({content: `Banned search term. Please try a different prompt to avoid the bot breaking the OpenAI terms of service: <https://beta.openai.com/docs/usage-guidelines/content-policy>`, ephemeral: true});
        return;
    }

    await interaction.deferReply();
    try {
        const completion = await openai.createCompletion({
            model: DEFAULT_AI_MODEL,
            prompt,
            max_tokens: DEFAULT_MAX_TOKENS,
            temperature: DEFAULT_TEMP,
            echo: true,
            user: interaction.user.id
        }, {
            timeout: DEFAULT_TIMEOUT
        });

        if (completion.data.choices && completion.data.choices.length > 0) {
            await interaction.editReply({content: completion.data.choices[0].text});
            return;
        }
    } catch (err) {
        await interaction.editReply({content: err.toString()});
        return;
    }

    await interaction.editReply({content: 'Failed to get response from API'});
}

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ai')
        .setDescription('Generates a reply using GPT3')
        .addStringOption(option => 
            option.setName('prompt')
                .setDescription('A prompt to help GPT3 get started')
                .setRequired(true)),
    async execute(interaction) {
        await handleGPT3(interaction);
    }
};