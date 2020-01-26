module.exports = class
{
  constructor (client)
  {
    this.client = client;
    this.name = 'messageDelete'
  }

  async run (message) {
    message.guild.channels.find('name', 'logs').send(`a message by ${message.author.tag} has been deleted\n"${message}"`, {code:""})
  }
}