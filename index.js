const fs = require(`node:fs`);
const path = require(`node:path`);
const { Client, Events, GatewayIntentBits, Collection } = require("discord.js");
const dotenv = require('dotenv');
const mtg = require('mtgsdk');
const inquirer = require("inquirer");


dotenv.config();

//Discord Bot Client Instance Initialization Logic ==-=-=---=--==---==
const client = new Client({ intents: [GatewayIntentBits.Guilds]});

client.commands = new Collection();

client.once(Events.ClientReady, c => {
    console.log(`Ready! Bot Logged in as ${c.user.tag}`)
});

client.login(process.env.DISCORD_TOKEN);

//
