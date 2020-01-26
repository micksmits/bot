const Command = require("../base")

class Unmute extends Command
{
  constructor (client) {
    super(client, {
      name: "unmute",
      description: "Unmute a member.",
      category:"Moderation",
      usage: "unmute <member>"
    })
  }

  async run (msg)
  {
    if (!this.hasPermBot(msg, 'MANAGE_ROLES')) return
    if (!this.hasPermUser(msg, 'MANAGE_ROLES')) return

    const user = msg.mentions.users.first();
    const member = msg.guild.member(user)

    if (member && member != msg.guild.me) {
      if (!member.roles.find('id', '670994176913178665')) return msg.channel.send('user is not muted')

      member.removeRole('670994176913178665')
      msg.channel.send('user unmuted')
      msg.channel.guild.channels.find('name', 'logs').send(
        `${member.user.tag} has been unmuted by ${msg.author.tag}`,
        {code:""}
      )
    }
  }
}

module.exports = Unmute