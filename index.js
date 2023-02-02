const Discord = require("discord.js");
const config = require("./discord_integration/config.json");
const mtg = require('mtgsdk');
const inquirer = require("inquirer");
const { GatewayIntentBits } = require("discord.js");

//randcard = Math.floor(Math.random() * 5000)

const client = new Discord.Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
    ]
});

const prefix = "!"

client.on("messageCreate", function(message) {
    
    if (message.author.bot) return;
    if (!message.content.startsWith(prefix)) return;
  
    const commandBody = message.content.slice(prefix.length);
    const args = commandBody.split(' ');
    const command = args.shift().toLowerCase();
  
    if (command === "ping") {
      const timeTaken = Date.now() - message.createdTimestamp;
      message.reply(`Pong! This message had a latency of ${timeTaken}ms.`);
    }
  
    else if (command === "sum") {
      const numArgs = args.map(x => parseFloat(x));
      const sum = numArgs.reduce((counter, x) => counter += x);
      message.reply(`The sum of all the arguments you provided is ${sum}!`);
    }
  });

client.login(config.BOT_TOKEN);

const question = [

    {
        type: "input",
        name: "card_name",
        message: "What Card Name?",
    }
]

const questionFunc = () => {
    return inquirer.prompt(question);
}

function magiccardsearch(data) {
    card_search = data.card_name;
    mtg.card.where({name: card_search})
    .then(cards => {
    console.log(
        `\n
        |==================================
        | Card Name: ${cards[0].name}
        |--------------------------|
        | Colors: ${cards[0].colorIdentity}|
        | Total Mana Cost: ${cards[0].cmc}|
        |--------------------------|
        | Type: ${cards[0].types}|
        |--------------------------|
        | Text: 
        | ${cards[0].text}
        |
        |==================================
        --------------------------
         Similar Cards May Include
        --------------------------`)
})
    .then(
        mtg.card.all({name: card_search, pageSize: 4})
        .on('data', card => {
            console.log(`       ${card.name} (CMC: ${card.cmc} Type: ${card.types} MVN:${card.number})`)}))
}


function init() {
    console.log("Welcome to MTG Card Search v1");
    questionFunc()
        //.then(answers => console.log(answers.card_name))
        .then(answers => magiccardsearch(answers))
        .catch((err) => console.error(err));
}





//init();