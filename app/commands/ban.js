const Command = require("../base")

class Ban extends Command
{
  constructor (client) {
    super(client, {
      name: "ban",
      description: "Ban a member from the guild.",
      category:"Moderation",
      usage: "ban <member> <reason>"
    })
  }

  async run (msg, args)
  {
    if (!this.hasPermBot(msg, 'BAN_MEMBERS')) return
    if (!this.hasPermUser(msg, 'BAN_MEMBERS')) return

    const user = msg.mentions.users.first()
    const member = msg.guild.member(user)

    args.shift()
    const reason = args.join(' ')

    if (member && member != msg.guild.me) {
      member.ban({
        reason: reason
      }).then(() => {
        msg.channel.send('User banned.')
      })
    }
  }
}

module.exports = Ban