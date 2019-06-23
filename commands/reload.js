const Command = require("../bootstrap/base");

class Reload extends Command
{
    constructor (client) {
        super(client, {
          name: "reload",
          description: "Reloads a command.",
          category:"System",
          usage: "reload <command>",
          permLevel: "developer"
        });
    }

    async run (msg, args)
    {
        if (!args || args.size < 1) return;

        const command = this.client.commands.get(args[0]);

        if (!command) return;

        let response = await this.client.unload(command.conf.location, command.help.name);
        if (response) return msg.channel.send(`Error unloading: ${response}`);

        response = this.client.load(command.conf.location, command.help.name);
        if (response) return msg.channel.send(`Error loading: ${response}`);

        msg.channel.send(`${command.help.name} has been reloaded`);
    }
}

module.exports = Reload;