module.exports = class
{
  constructor (client)
  {
    this.client = client
    this.name = 'messageReactionRemove'
  }

  async run (reaction, user) {
    const message = reaction.message
    const rolemessage = await this.client.db.message.findByPk(message.id)
    const reactions = await rolemessage.getReactions()

    reactions.forEach(reactionRecord => {
      if (reaction.emoji.id == reactionRecord.id) {
        message.guild.member(user).removeRole(reactionRecord.role_id)
      }
    })
  }
}