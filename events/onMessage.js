module.exports = class
{
    constructor (client)
    {
        this.client = client;
        this.name = 'message';
    }

    async run (message) {
        if (message.channel.name === 'selfies' && message.attachments.size < 1) message.delete();

        message = message.toLowerCase();
        if (message.includes('bepis')) message.delete();
    }
}