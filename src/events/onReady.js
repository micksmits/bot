module.exports = class
{
  constructor (client)
  {
    this.client = client
    this.name = 'ready'
  }

  async run () {
    await this.client.wait(1000)

    const guilds = this.client.guilds

    guilds.forEach(async guild => {
      const hasGuild = await this.client.db.guild.findByPk(guild.id)

      if (!hasGuild) {
        await this.client.db.guild.create({id: guild.id})
      }
    })
  }
}