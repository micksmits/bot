import { SlashCommandBuilder } from "discord.js";

export default {
  data: new SlashCommandBuilder().setName('ping').setDescription('Send a pong back'),
  async execute(interaction: any) {
    console.log('ping command');
    await interaction.reply('Poing!');
  },
}
