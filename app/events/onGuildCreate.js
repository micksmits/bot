module.exports = class
{
  constructor (client)
  {
    this.client = client
    this.name = 'guildCreate'
  }

  async run (guild) {
    await this.client.db.guild.create({id: guild.id}).catch((err) => {
      console.log(err)
    })
  }
}