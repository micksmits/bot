import { Client, Collection, Intents } from 'discord.js';
import { Config } from './config';
import * as dotenv from 'dotenv';
import path from 'path';

dotenv.config();

class Bot extends Client {
  private commands: Collection<any, any>;
  public readonly config: Config;

  /**
   * Create a new Bot instance.
   *
   * @param {*} options
   * @return void
   */
  constructor (options: any) {
    super(options);

    this.commands = new Collection();
    this.config = {
      botName: process.env.BOT_NAME,
      botToken: process.env.BOT_TOKEN
    };
  }

  /**
   * Get the message author's permission level.
   *
   * @param {string} message
   * @return number
   */
  private getPermissionLevel (message: string) {
    // TODO: Hook up ORM
  }

  /**
   * Load a command given the path and its name.
   *
   * @param {string} commandPath
   * @param {string} commandName
   * @return bool
   */
  private loadCommand (commandPath, commandName) {
    try {
      const props = new (require(`${commandPath}${path.sep}${commandName}`))(this);
      props.conf.location = commandPath;

      if (props.init) {
        props.init(this);
      }

      this.commands.set(props.help.name, props);
      return false;
    } catch (e) {
      return `Unable to load command ${commandName}: ${e}`;
    }
  }

  /**
   * Unload a command given the path and its name.
   *
   * @param {string} commandPath
   * @param {string} commandName
   * @return bool
   */
  async unloadCommand (commandPath, commandName) {
    let command;
    if (this.commands.has(commandName)) command = this.commands.get(commandName);

    if (!command) return `${commandName} does not exist.`;

    if (command.shutdown) await command.shutdown(this);

    delete require.cache[require.resolve(`${commandPath}${path.sep}${commandName}.js`)];
    return false;
  }
}

const client = new Bot({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

const init = async () => {
  return await client.login(client.config.botToken);
};

init().then((output) => {
  console.log(output);
});
