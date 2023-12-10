import { SlashCommandBuilder } from 'discord.js';

export default {
  data: new SlashCommandBuilder().setName('ping').setDescription('Send a pong back'),
  async execute(interaction: any) {
    await interaction.reply('Pong!');
  },
};
