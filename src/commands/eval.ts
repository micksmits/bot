import { SlashCommandBuilder } from 'discord.js';

export default {
  data: new SlashCommandBuilder()
    .setName('eval')
    .setDescription('Eval an expression')
    .addStringOption(option => 
      option
        .setName('expression')
        .setDescription('The expression to evaluate')
        .setRequired(true)
    ),
  async execute(client, interaction) {
    const expression = interaction.options.getString('expression');

    //TODO: if result contains sensitive info, make it ephemeral
    try {
      const result = eval(expression);
      await interaction.reply({ content: `Expression: ${expression}\nResult: ${result}`, ephemeral: false });
    } catch (error) {
      await interaction.reply({ content: `Expression: ${expression}\nResult: ${error}`, ephemeral: false });
    }
  },
};
