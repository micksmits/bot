const Command = require("../base")

class Unban extends Command
{
  constructor (client) {
    super(client, {
      name: "unban",
      category: 1
    })
  }

  async run (msg, args)
  {
    if (!this.hasPermBot(msg, 'BAN_MEMBERS')) return
    if (!this.hasPermUser(msg, 'BAN_MEMBERS')) return

    const user = args[0].substring(3, (args[0].length -1))

    if (!user) return

    try {
      if (msg.guild.fetchBan(user)) {
        msg.guild.unban(user)
        msg.channel.send('User unbanned.')
      }
    } catch(error) {
      msg.channel.send('Unknown user.')
    }
  }
}

module.exports = Unban;