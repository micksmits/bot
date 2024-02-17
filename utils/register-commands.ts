import { REST, Routes } from 'discord.js';
import * as fs from 'fs';
import * as path from 'path';
import { TibClient } from '../main';

const TOKEN = process.env.DISCORD_TOKEN!;
const CLIENT_ID = process.env.DISCORD_CLIENT_ID!;

export async function registerCommands(client: TibClient, guildId: string) {
  const commandsPath = path.join(__dirname, '../commands');
  const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.ts'));

  const commands = [];

  for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const command = require(filePath).default;

    if ('data' in command && 'execute' in command) {
      client.commands.set(command.data.name, command);
      commands.push(command.data.toJSON());
    } else {
      console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
    }
  }

  const rest = new REST().setToken(TOKEN);

  await rest.put(
    Routes.applicationGuildCommands(CLIENT_ID, guildId),
    { body: commands }
  );
}