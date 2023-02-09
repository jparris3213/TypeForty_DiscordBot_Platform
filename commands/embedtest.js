const { SlashCommandBuilder, EmbedBuilder} = require('discord.js');
const mtg = require(`mtgsdk`);

function mana_sources(data) {
    if (data == 'B') {
        return "💀" ;
    } else if (data == 'U') {
        return "💧";
    } else if (data == 'R') {
        return "🔥";
    } else if (data == 'G') {
        return "🌳";
    } else if (data == 'W') {
        return "🌟";
    } else {
        return data
    }
}
    
module.exports = {
    data: new SlashCommandBuilder()
        .setName('embedtest')
        .setDescription('Searches MTG API for Card Info')
        .addStringOption(option => option.setName('cardname').setDescription('Search By Card name')),


    async execute(interaction) {
        const value = interaction.options.getString('cardname');
        await interaction.deferReply();
        const mtg_scry = await mtg.card.where({name: value});

         if (!mtg_scry.length) {
            return interaction.editReply(`No Results found for ${value}`);
        };
        const color_emoji = await mana_sources(mtg_scry[0].colorIdentity)

        console.log(`User Searched for ${mtg_scry[0].name}`)
        console.log('Color Identity:', color_emoji, mtg_scry[0].colorIdentity)

        const embed = new EmbedBuilder()
			.setColor(0xEFFF00)
			.setTitle(mtg_scry[0].name)
			.setURL('https://discord.js.org')
			.addFields(
				{ name: 'Card Description', value: `${mtg_scry[0].text}`},
				{ name: 'Type', value: `${mtg_scry[0].types}` },
				{
					name: 'Mana',
					value: `${color_emoji}`,
				},
			);

        return interaction.editReply({embeds: [embed]})

    }

    
}