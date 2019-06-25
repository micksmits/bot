module.exports = class
{
    constructor (client)
    {
        this.client = client;
        this.name = 'messageDelete';
    }

    async run (message) {
        message.guild.channels.find('name', 'logs').send(`a message has been deleted by ${message.author.tag}\n"${message}"`, {code:""});
    }
}