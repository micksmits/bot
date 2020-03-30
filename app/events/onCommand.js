module.exports = class
{
  constructor (client)
  {
    this.client = client
    this.name = 'message'
  }

  async run (message) {
    if (message.author.bot) return
    if (!message.guild) return
    if (message.content.indexOf(this.client.config.prefix) !== 0) return

    const args = message.content.slice(this.client.config.prefix.length).trim().split(/ +/g)
    const command = args.shift().toLowerCase()

    const cmd = this.client.commands.get(command)
    if (!cmd) return

    const user = message.mentions.users.first();
    const member = message.guild.member(user)
    if (member == message.guild.me) return

    cmd.run(message, args)
  }
}