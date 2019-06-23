module.exports = class
{
    constructor (client)
    {
        this.client = client;
    }

    async run (message) {
        if (message.author.bot) return;

        if (message.channel.name === 'selfies' && message.attachments.size < 1) message.delete();

        message.config = this.client.config;

        const level = this.client.permlevel(message);
        console.log(level);

        const args = message.content.slice(this.client.config.prefix.length).trim().split(/ +/g);
        const command = args.shift().toLowerCase();

        const cmd = this.client.commands.get(command);
        if (!cmd) return;

        if (!message.guild) return;

        console.log(this.client.levelCache[cmd.conf.permLevel]);
        if (level < this.client.levelCache[cmd.conf.permLevel]) {
            return message.channel.send('you may not utilize this command');
        }

        cmd.run(message, args);
    }
}