module.exports = class
{
    constructor (client)
    {
        this.client = client;
        this.name = 'messageUpdate';
    }

    async run (oldMessage, newMessage) {
        if (newMessage.content.toLowerCase().replace(/\s/g, '').includes('bepis') && newMessage.channel.name !== 'logs') newMessage.delete();
    }
}