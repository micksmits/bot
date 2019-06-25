module.exports = class
{
    constructor (client)
    {
        this.client = client;
        this.name = 'guildMemberAdd';
    }

    async run (member) {
        member.guild.channels.find('name', 'logs').send(`${member.user.tag} has joined the server`, {code:""});
    }
}