module.exports = class
{
  constructor (client)
  {
    this.client = client;
    this.name = 'messageDelete'
  }

  async run (message) {
    const channel = await this.client.db.channel.findOne({ where: {guild_id: message.guild.id, type: 'logs'}})
    if (channel) {
      message.guild.channels.get(channel.id).send(`a message by ${message.author.tag} has been deleted\n"${message}"`, {code:""})
    }
  }
}