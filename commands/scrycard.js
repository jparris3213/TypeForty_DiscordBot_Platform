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
    } else if (data == 'B,U') {
        return "💀💧";
    } else if (data == 'B,U') {
        return "💀💧";
    } else if (data == 'B,U') {
        return "💀💧";
    } else if (data == 'B,U') {
        return "💀💧";
    } else if (data == 'B,U') {
        return "💀💧";
    } else {
        return data
    }
}
    
module.exports = {
    data: new SlashCommandBuilder()
        .setName('scry')
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

        const embed = new EmbedBuilder()
			.setColor(0xEFFF00)
			.setTitle(mtg_scry[0].name)
            .setDescription(`${mtg_scry[0].supertypes} ${mtg_scry[0].types} - ${mtg_scry[0].subtypes}`)
			.setURL(`${mtg_scry[0].imageUrl}`|| `https://www.discord.js`)
			.addFields(
                { name: 'Description', value: `${mtg_scry[0].text}`},
				{ name: 'Total Mana Cost', value: `${mtg_scry[0].cmc}`, inline: true},
				{
					name: 'Mana Color',
					value: `${color_emoji}`,
                    inline: true,
				},
            );

        return interaction.editReply({embeds: [embed]}).catch(err => console.log(err))

    }

    
}