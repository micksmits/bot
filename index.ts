import { Client, GatewayIntentBits, REST, Routes } from 'discord.js';
import 'dotenv/config';

const client = new Client({ intents: [GatewayIntentBits.Guilds] });
const commands = [
  {
    name: 'ping',
    description: 'Replies with Pong!',
  },
];
const TOKEN = process.env.DISCORD_TOKEN!;
const CLIENT_ID = process.env.DISCORD_CLIENT_ID!;

async function registerCommands(rest: REST) {
  try {
    console.log('Started refreshing application (/) commands.');
  
    await rest.put(Routes.applicationCommands(CLIENT_ID), { body: commands });
  
    console.log('Successfully reloaded application (/) commands.');
  } catch (error) {
    console.error(error);
  }
}

(async () => {
  const rest = new REST({ version: '10' }).setToken(TOKEN);
  await registerCommands(rest);

  client.on('ready', () => {
    console.log(`Logged ins ${client.user!.tag}!`);
  });

  client.on('interactionCreate', async interaction => {
    if (!interaction.isChatInputCommand()) return;

    if (interaction.commandName === 'ping') {
      await interaction.reply('Pong!');
    }
  });

  client.login(TOKEN);
})();
