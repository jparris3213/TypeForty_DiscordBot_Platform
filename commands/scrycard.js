const { SlashCommandBuilder} = require('discord.js');
const mtg = require(`mtgsdk`);
const { EmbedBuilder } = require('discord.js');
const wait = require('node:timers/promises').setTimeout;

module.exports = {

    





    data: new SlashCommandBuilder()
        .setName('scrycard')
        .setDescription('Searches MTG API for Card Info')
        .addStringOption(option => option.setName('cardname').setDescription('Search By Card name')),
        
        
        async execute(interaction) {
        const value = interaction.options.getString('cardname');
        const mtg_scry = await mtg.card.where({name: value});

         if (!mtg_scry.length) {
            return interaction.reply(`No Results found for ${value}`);
        };

        

        const cardembed= new EmbedBuilder().setTitle('sometitle');

        if (mtg_scry[0].imageUrl) {
            cardembed.setImage(mtg_scry[0].imageUrl)
        }

        

        console.log(`User Searched for ${mtg_scry[0].name}`)
        var description_splice1 = mtg_scry[0].text.slice(0,42)
        var description_splice2 = mtg_scry[0].text.slice(42,84)
        var description_splice3 = mtg_scry[0].text.slice(84,126)
        var description_splice4 = mtg_scry[0].text.slice(126,167)

    }

    
}