import { SlashCommandBuilder } from "discord.js";

export default {
  data: new SlashCommandBuilder().setName('ping').setDescription('Send a pong back'),
  async execute(interaction) {
    await interaction.reply('Poing!');
  },
}