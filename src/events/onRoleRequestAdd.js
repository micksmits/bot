module.exports = class
{
  constructor (client)
  {
    this.client = client
    this.name = 'messageReactionAdd'
  }

  async run (reaction, user) {
    const message = reaction.message
    const rolemessage = await this.client.db.message.findByPk(message.id)
    if (rolemessage) {
      const reactions = await rolemessage.getReactions()
      let role

      reactions.forEach(async reactionRecord => {
        if (reaction.emoji.id == reactionRecord.id) {
          message.guild.member(user).addRole(reactionRecord.role_id)
          role = true
        }
      })

      if (!role) await reaction.remove(user)
    }
  }
}