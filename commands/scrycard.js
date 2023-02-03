const { SlashCommandBuilder} = require('discord.js');
const mtg = require(`mtgsdk`);
   
    
module.exports = {
    data: new SlashCommandBuilder()
        .setName('scry')
        .setDescription('Searches MTG API for Card Info')
        .addStringOption(option => option.setName('cardname').setDescription('Search By Card name')),


    async execute(interaction) {
        const value = interaction.options.getString('cardname');
        const mtg_scry = await mtg.card.where({name: value});

         if (!mtg_scry.length) {
            return interaction.reply(`No Results found for ${value}`);
        };

        console.log(`User Searched for ${mtg_scry[0].name}`)
        var description_splice1 = mtg_scry[0].text.slice(0,42)
        var description_splice2 = mtg_scry[0].text.slice(42,84)
        var description_splice3 = mtg_scry[0].text.slice(84,126)
        var description_splice4 = mtg_scry[0].text.slice(126,167)

        return interaction.reply(
            `Card Info:

            | Card: ${mtg_scry[0].name}
            | Colors: ${mtg_scry[0].colorIdentity}
            | Total Mana Cost: ${mtg_scry[0].cmc}
            | Type: ${mtg_scry[0].types}
            | Text: 
            | ${description_splice1}
            | ${description_splice2}
            | ${description_splice3}
            | ${description_splice4}
            `)

    }

    
}