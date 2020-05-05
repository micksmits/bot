const Command = require("../base")

class Leave extends Command
{
  constructor (client) {
    super(client, {
      name: "leave",
      description: "Returns average CPU load times.",
      category:"System",
      usage: "cpu"
    })
  }

  async run (msg)
  {
    if (!this.isBotOwner(msg.author.id)) return

    this.client.emit("guildDelete", msg.guild);
  }
}

module.exports = Leave