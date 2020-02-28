class Command
{
  constructor(client, {
    name = null,
    description = "No description provided.",
    category = "Miscellaneous",
    usage = "No usage provided.",
    enabled = true,
    guildOnly = false,
    aliases = new Array(),
    permLevel = "User"
  }) {
    this.client = client;
    this.conf = { enabled, guildOnly, aliases, permLevel }
    this.help = { name, description, category, usage }
  }

  hasPermBot(msg, perm)
  {
    const bot = msg.guild.me

    return bot.permissions.has(perm)
  }

  hasPermUser(msg, perm)
  {
    const user = msg.guild.member(msg.author)

    return user.permissions.has(perm)
  }

  isBotOwner(author)
  {
    return author == this.client.config.owner
  }
}

module.exports = Command