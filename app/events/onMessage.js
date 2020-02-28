module.exports = class
{
  constructor (client)
  {
    this.client = client
    this.name = 'message'
  }

  async run (message) {
    const channel = await this.client.db.channel.findOne({ where: {id: message.channel.id, server_id: message.guild.id, type: 'media'}})
    if (channel && message.attachments.size < 1) {
      message.delete()
    }

    const user = await this.client.db.user.findByPk(message.author.id)
    if (user === null) {
      this.client.db.user.create({id: message.author.id})
    }
  }
}