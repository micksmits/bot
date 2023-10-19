import { EmbedBuilder, SlashCommandBuilder } from "discord.js";
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
    const movieEmbed = new EmbedBuilder()
      .setColor('#000000')
      .setTitle(chosenMovie.original_title)
      .setDescription(chosenMovie.overview)
      .setImage(`https://image.tmdb.org/t/p/w600_and_h900_bestv2/${chosenMovie.poster_path}`)
      .addFields(
        { name: 'Rating', value: Math.round(chosenMovie.vote_average).toString()},
        { name: 'Language', value: chosenMovie.original_language.toUpperCase()},
        { name: 'Release Date', value: chosenMovie.release_date}
      )

    console.log(chosenMovie);

    await interaction.reply({ embeds: [movieEmbed] });
  },
}




