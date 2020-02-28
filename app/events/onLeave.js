module.exports = class
{
  constructor (client)
  {
    this.client = client
    this.name = 'guildMemberRemove'
  }

  async run (member) {
    const channel = await this.client.db.channel.findOne({ where: {server_id: member.guild.id, type: 'logs'}})
    if (channel) {
      member.guild.channels.get(channel.id).send(`${member.user.tag} has left the server`, {code:""})
    }
  }
}