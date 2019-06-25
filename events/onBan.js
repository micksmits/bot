module.exports = class
{
    constructor (client)
    {
        this.client = client;
        this.name = 'guildBanAdd';
    }

    async run (guild, user) {
        guild.channels.find('name', 'logs').send(`${user.tag} has been banned`, {code:""});
    }
}