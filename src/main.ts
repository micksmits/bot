import { Client, Collection, GatewayIntentBits } from 'discord.js';
import { registerCommands } from './utils/register-commands';
import 'dotenv/config';

type Command = {
  execute: (client, interaction) => Promise<void>;
}

export class TibClient extends Client {
  commands: Collection<string, Command>;

  constructor() {
    super({ intents: [GatewayIntentBits.GuildMembers, GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages] });
    this.commands = new Collection();
  }
}

const client = new TibClient();
const TOKEN = process.env.DISCORD_TOKEN!;

async function main() {

  client.on('ready', async () => {
    console.log(`Logged in as ${client.user.tag}!`);
    const guilds = client.guilds.cache;
    guilds.forEach(async (guild) => registerCommands(client, guild.id));
  });

  client.on('interactionCreate', async interaction => {
    if (!interaction.isChatInputCommand()) return;

    const member = await interaction.guild.members.fetch(interaction.user);

    if (!member.roles.cache.some(role => role.name === 'test role')) return;

    const command = client.commands.get(interaction.commandName);
    if (!command) return;

    await command.execute(client, interaction);
  });

  await client.login(TOKEN);
}

main();
