# Mr. Orang

Mr. Orang is a discord bot that likes to help people.

## Prerequisites

* npm
* node

## Setup

* Go [here](https://discordapp.com/developers/applications) to make a bot.
* Follow the instructions [here](https://discordjs.guide/preparations/setting-up-a-bot-application.html) on 'Setting up a bot application`, making sure to write down or copy your Client ID and Bot Token.

* Edit this link, replacing the string of numbers after `client_id=` with the Client ID you just noted down.
`https://discord.com/api/oauth2/authorize?client_id=123456789012345678&permissions=0&scope=bot%20applications.commands8`
* Paste the link into your browser and choose the server you wish to add the bot to. You must have `Manage Server` permissions.

## Configuration

* Copy the file `.env.example` to `.env` (`cp .env.example .env`)
* Enter your id and token in `.env`.
* **Don't reveal this token to anyone!**

In order to use all the commands you'll need to get API keys for each service and add them to their respective fields in .env. This will be left as an exercise for the reader.

## Installation

`npm install`

## Running

`npm start`