const {Client, Collection} = require('discord.js');
const {promisify} = require('util');
const readdir = promisify(require('fs').readdir);
const klaw = require("klaw");
const path = require("path");

class Frog extends Client
{
    /**
     * Create a new Frog instance.
     * 
     * @param {*} options
     * @return void
     */
    constructor (options)
    {
        super(options);

        this.config = require('./env');

        this.commands = new Collection();

        this.wait = require('util').promisify(setTimeout);
    }

    /**
     * Get the message author's permission level.
     * 
     * @param {string} message
     * @return number
     */
    permlevel (message)
    {
        let permlvl = 0;

        const permOrder = this.config.permLevels.slice(0).sort((p, c) => p.level < c.level ? 1 : -1);

        while (permOrder.length) {
            const currentLevel = permOrder.shift();
            if (currentLevel.check(message)) {
                permlvl = currentLevel.level;
                break;
            }
        }

        return permlvl;
    }

    /**
     * Load a command given the path and its name.
     * 
     * @param {string} commandPath
     * @param {string} commandName
     * @return bool
     */
    load (commandPath, commandName)
    {
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
    async unload (commandPath, commandName) {
        let command;
        if (this.commands.has(commandName)) command = this.commands.get(commandName);

        if (!command) return `${commandName} does not exist.`;

        if (command.shutdown) await command.shutdown(this);

        delete require.cache[require.resolve(`${commandPath}${path.sep}${commandName}.js`)];
        return false;
    }
}

const client = new Frog();

const init = async () => {
    klaw('./commands').on('data', (item) => {
        const cmdFile = path.parse(item.path);
        if (!cmdFile.ext || cmdFile.ext !== '.js') return;
        const response = client.load(cmdFile.dir, `${cmdFile.name}${cmdFile.ext}`);
    });

    const evtFiles = await readdir("./events/");
    evtFiles.forEach(file => {
        const eventName = file.split(".")[0];
        const event = new (require(`./events/${file}`))(client);

        client.on(eventName, (...args) => event.run(...args));
        delete require.cache[require.resolve(`./events/${file}`)];
    });

    client.levelCache = {};
    for (let i = 0; i < client.config.permLevels.length; i++) {
        const thisLevel = client.config.permLevels[i];
        client.levelCache[thisLevel.name] = thisLevel.level;
    }

    client.login(client.config.token);
}

init();