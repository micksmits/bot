const Command = require("../bootstrap/base");
const os = require('os');

class Cpu extends Command
{
    constructor (client) {
        super(client, {
          name: "cpu",
          description: "Returns average CPU load times.",
          category:"System",
          usage: "cpu",
          permLevel: "developer"
        });
    }

    async run (msg, args)
    {
        const avg = os.loadavg();

        msg.reply(`load averages 1: **${avg[0].toFixed(2)}**  5: **${avg[1].toFixed(2)}**  15: **${avg[2].toFixed(2)}**`);
    }
}

module.exports = Cpu;