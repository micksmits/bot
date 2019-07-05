module.exports = class
{
    constructor (client)
    {
        this.client = client;
        this.name = 'guildMemberRemove';
    }

    async run (member) {
        member.guild.channels.find('name', 'logs').send(`${member.user.tag} has left the server`, {code:""});
    }
}