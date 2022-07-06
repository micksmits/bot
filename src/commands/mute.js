const Command = require("../base")

class Mute extends Command
{
  constructor (client) {
    super(client, {
      name: "mute",
      category: 1
    })
  }

  async run (msg, args)
  {
    if (!this.hasPermBot(msg, 'MANAGE_ROLES')) return
    if (!this.hasPermUser(msg, 'MANAGE_ROLES')) return

    let role = await this.client.db.role.findOne({where: {guild_id: msg.guild.id, type: 'mute'}})
    if (!role) return

    const user = msg.mentions.users.first();
    const member = msg.guild.member(user)

    if (member) {
      if (member.roles.get(role.id)) return msg.channel.send('User is already muted.')

      member.addRole(role.id)
      msg.channel.send('User muted.')
    }
  }
}

module.exports = Mute