import { EmbedBuilder, SlashCommandBuilder } from "discord.js";
import axios from 'axios';






export default {
    data: new SlashCommandBuilder()
        .setName('guild-information')
        .setDescription('Get basic information about the guild'),

    
    async execute(interaction: any) {
        const result = await axios.get('https://api.guildwars2.com/v2/guild/'), {
            params: {
                ID: process.env.GUILD_ID,
                headers: {
                    'Authorization': `bearer ${process.env.GW2_API}`
                }
            }
        }
        
    }


}