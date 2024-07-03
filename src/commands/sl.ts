import { SlashCommandBuilder } from 'discord.js';
import * as os from 'os';

export default {
  data: new SlashCommandBuilder()
    .setName('sl')
    .setDescription('Return server load'),
  async execute(client, interaction) {
    const loadAvg = os.loadavg();

    await interaction.reply({ content: `[0]: ${loadAvg[0]}\n[1]: ${loadAvg[1]}\n[2]: ${loadAvg[2]}`, ephemeral: false });
  },
};
