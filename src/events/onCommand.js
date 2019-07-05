module.exports = class
{
    constructor (client)
    {
        this.client = client;
        this.name = 'message';
    }

    async run (message) {
        if (message.author.bot) return;
        if (!message.guild) return;
        if (message.content.indexOf(this.client.config.prefix) !== 0) return;

        message.config = this.client.config;

        const level = this.client.permlevel(message);

        const args = message.content.slice(this.client.config.prefix.length).trim().split(/ +/g);
        const command = args.shift().toLowerCase();

        const cmd = this.client.commands.get(command);
        if (!cmd) return;

        if (level < this.client.levelCache[cmd.conf.permLevel]) {
            return message.channel.send('you may not utilize this command');
        }

        cmd.run(message, args);
    }
}