const { SlashCommandBuilder} = require('discord.js');
const mtg = require(`mtgsdk`);
   
    
module.exports = {
    data: new SlashCommandBuilder()
        .setName('scrycard')
        .setDescription('Searches MTG API for Card Info')
        .addStringOption(option => option.setName('cardname').setDescription('Search By Card name')),


    async execute(interaction) {
        const value = interaction.options.getString('cardname');
        const mtg_scry = await mtg.card.where({name: value});
        //console.log(mtg_scry)

        //const { card_info } = await mtg_scry;
        
/*         if (!card_info) {
            return interaction.reply(`No Results found for ${value}`);
        }; */

        console.log(mtg_scry[0])
        
        return interaction.reply(
            `\n
            |==================================
            | Card: ${mtg_scry[0].name}
            |--------------------------|
            | Colors: ${mtg_scry[0].colorIdentity}|
            | Total Mana Cost: ${mtg_scry[0].cmc}|
            |--------------------------|
            | Type: ${mtg_scry[0].types}|
            |--------------------------|
            | Text: 
            | ${mtg_scry[0].text}
            |
            |==================================
            `)

    }

    
}