import { SlashCommandBuilder } from "discord.js";
import axios from 'axios';

export default {
  data: new SlashCommandBuilder()
    .setName('recommendmovie')
    .setDescription('Recommend a movie based on a given category')
    .addStringOption(option =>
      option.setName('query')
        .setDescription('Query the movie you\'d like to see')
        .setRequired(true)),
  async execute(interaction: any) {

    const query = interaction.options.getString('query');

    const result = await axios.get('https://api.themoviedb.org/3/search/movie', {
      params: {
        api_key: process.env.TMDB_TOKEN,
        query,
      }
    });

    const chosenMovie = result.data.results[0];

    console.log(chosenMovie);

    await interaction.reply(`I found: ${chosenMovie.original_title} - ${chosenMovie.overview}`);
  },
}
