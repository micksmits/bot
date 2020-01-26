const Command = require("../base")
const os = require('os')

class Cpu extends Command
{
  constructor (client) {
    super(client, {
      name: "cpu",
      description: "Returns average CPU load times.",
      category:"System",
      usage: "cpu"
    })
  }

  async run (msg)
  {
    if (!this.isBotOwner(msg.author.id)) return

    const avg = os.loadavg()

    msg.reply(`load averages 1: **${avg[0].toFixed(2)}**  5: **${avg[1].toFixed(2)}**  15: **${avg[2].toFixed(2)}**`)
  }
}

module.exports = Cpu