const Command = require("../base")

class Mute extends Command
{
  constructor (client) {
    super(client, {
      name: "mute",
      description: "Mute a member.",
      category:"Moderation",
      usage: "mute <member> <reason>"
    })
  }

  async run (msg, args)
  {
    if (!this.hasPermBot(msg, 'MANAGE_ROLES')) return
    if (!this.hasPermUser(msg, 'MANAGE_ROLES')) return

    const user = msg.mentions.users.first();
    const member = msg.guild.member(user)

    args.shift()
    const reason = args.join(' ')

    if (member && member != msg.guild.me) {
      if (member.roles.find('id', '670994176913178665')) return msg.channel.send('user is already muted')

      member.addRole('670994176913178665')
      msg.channel.send('user muted')
      msg.channel.guild.channels.find('name', 'logs').send(
        `${member.user.tag} has been muted by ${msg.author.tag} because: ${reason}`,
        {code:""}
      )
    }
  }
}

module.exports = Mute