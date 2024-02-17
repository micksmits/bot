import { EmbedBuilder, SlashCommandBuilder } from 'discord.js';
import categories from '../utils/categories.json';
import axios from 'axios';

export default {
  data: new SlashCommandBuilder()
    .setName('recommendmovie')
    .setDescription('Recommend a movie based on a given category')
    .addStringOption(option =>
      option.setName('category')
        .setDescription('Choose the category of the movies you would like to see')
        .setRequired(true)
        .addChoices(
          ...categories
        )),
  async execute(interaction) {
    const category = interaction.options.getString('category');

    const result = await axios.get('https://api.themoviedb.org/3/discover/movie', {
      params: {
        api_key: process.env.TMDB_TOKEN,
        include_adult: false,
        include_video: false,
        language: 'en-US',
        page: 1,
        sort_by: 'popularity.desc',
        with_genres: category

      }
    });

    const movies = [];

    for (let i=0; i < 10; i++) {
      const movie = result.data.results[i];
      const embed = new EmbedBuilder()
        .setColor('#000000')
        .setTitle(movie.original_title)
        .setDescription(movie.overview)
        .setImage(`https://image.tmdb.org/t/p/w600_and_h900_bestv2/${movie.poster_path}`)
        .addFields(
          { name: 'Rating', value: Math.round(movie.vote_average).toString()},
          { name: 'Language', value: movie.original_language.toUpperCase()},
          { name: 'Release Date', value: movie.release_date}
        );

      movies.push(embed);
    }

    await interaction.reply({ embeds: movies });
  },
};
