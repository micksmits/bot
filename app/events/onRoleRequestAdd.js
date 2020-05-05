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
    const reactions = await rolemessage.getReactions()

    reactions.forEach(async reactionRecord => {
      if (reaction.emoji.id == reactionRecord.id) {
        message.guild.member(user).addRole(reactionRecord.role_id)
      } else {
        await reaction.remove(user)
      }
    })
  }
}