const Command = require("../base")

class Ban extends Command
{
  constructor (client) {
    super(client, {
      name: "unban",
      description: "Unban a member from the guild.",
      category:"Moderation",
      usage: "unban <member> <reason>"
    })
  }

  async run (msg, args)
  {
    console.log(args)
    const user = this.client.fetchUser(args.shift())

    console.log(user)

    return
    msg.guild.fetchBan(this.client.fetchUser(args.shift()))
    .then(({ user, reason }) => console.log('lol'))
    .catch(console.error)

    console.log(msg.guild.fetchBan(args.shift()))
    if (!this.hasPermBot(msg, 'BAN_MEMBERS')) return
    if (!this.hasPermUser(msg, 'BAN_MEMBERS')) return

    const user = msg.mentions.users.first()

    if (!user) return
  }
}

module.exports = Ban;