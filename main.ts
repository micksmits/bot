import { PrismaClient } from '@prisma/client';
import { Client, Collection, EmbedBuilder, GatewayIntentBits, TextChannel } from 'discord.js';
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
const prisma = new PrismaClient();

async function main() {

  client.on('ready', async () => {
    console.log(`Logged in as ${client.user.tag}!`);
    const guilds = client.guilds.cache;
    guilds.forEach(async (guild) => registerCommands(client, guild.id));
  });

  client.on('interactionCreate', async interaction => {
    if (!interaction.isChatInputCommand()) return;

    const command = client.commands.get(interaction.commandName);
    if (!command) return;

    await command.execute(client, interaction);
  });

  client.on('guildMemberAdd', async member => {
    const channel = member.guild.channels.cache.get('1170060748748238848');
    const welcomeEmbed = new EmbedBuilder()
      .setColor('#b700ff')
      .setTitle('Welcome to the Interstellar Refugee')
      .setDescription(`Welcome <@${member.user.id}>`)
      .setThumbnail('https://i.imgur.com/a9GXe4z.png');

    channel.isTextBased && (channel as TextChannel).send({ embeds: [welcomeEmbed] });
  });

  await client.login(TOKEN);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
