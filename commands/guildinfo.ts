import { EmbedBuilder, SlashCommandBuilder } from "discord.js";
import axios from 'axios';






export default {
    data: new SlashCommandBuilder()
        .setName('guild-information')
        .setDescription('Get basic information about the guild'),

    
    async execute(interaction: any) {
        const gw2Result = await axios.get(`https://api.guildwars2.com/v2/guild/${process.env.GW2_GUILD_ID}`, {
            headers: {
                'Authorization': `Bearer ${process.env.GW2_API}`
            },
        })
        console.log(gw2Result)
        const embed = new EmbedBuilder()
            .setColor('#b700ff')
            .setTitle(`${gw2Result.data.name}`)
            .addFields(
                {
                  name: "Influence",
                  value: `Our guild currently has ${gw2Result.data.influence} influence`,
                  inline: false
                },
                {
                  name: "Aetherium",
                  value: `Our guild currently has ${gw2Result.data.aetherium} aetherium`,
                  inline: false
                },
                {
                  name: "Favor",
                  value: `Our guild currently has ${gw2Result.data.favor} favor`,
                  inline: false
                },
                {
                  name: "Current amount of guild members",
                  value: `Our guild currently has ${gw2Result.data.member_count} members`,
                  inline: false
                },
              )
        await interaction.reply({ embeds: [embed] });
    }

    


}