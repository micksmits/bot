module.exports = class
{
    constructor (client)
    {
        this.client = client;
        this.name = 'message';
    }

    async run (message) {
        if (message.channel.name === 'selfies' && message.attachments.size < 1) message.delete();

        if (message.content.toLowerCase().includes('bepis') && message.channel.name !== 'logs') message.delete();
    }
}