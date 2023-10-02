import { Client, GatewayIntentBits, REST, Routes } from 'discord.js';

const client = new Client({ intents: [GatewayIntentBits.Guilds] });
const commands = [
  {
    name: 'ping',
    description: 'Replies with Pong!',
  },
];
const TOKEN = 'MTE1ODQ4MzA5OTQ1MDA4MTMyMQ.Gk-VUp.DsRDAvhYco0n-uxqkFSKnJl5ajQuHqtlFthDL0';
const CLIENT_ID = '1158483099450081321';

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
