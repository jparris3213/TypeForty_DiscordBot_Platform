const mtg = require('mtgsdk');
const inquirer = require("inquirer");

//randcard = Math.floor(Math.random() * 5000)

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

init();