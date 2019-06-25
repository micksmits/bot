module.exports = class
{
    constructor (client)
    {
        this.client = client;
        this.name = 'guildBanRemove';
    }

    async run (guild, user) {
        guild.channels.find('name', 'logs').send(`${user.tag} has been unbanned`, {code:""});
    }
}