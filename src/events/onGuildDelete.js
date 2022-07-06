module.exports = class
{
  constructor (client)
  {
    this.client = client
    this.name = 'guildDelete'
  }

  async run (guild) {
    await this.client.db.guild.destroy({
      where: {
        id: guild.id
      }
    }).catch((err) => {
      console.log(err)
    })
  }
}