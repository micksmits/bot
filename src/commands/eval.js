const Command = require("../bootstrap/base");

class Eval extends Command
{
    constructor (client) {
        super(client, {
          name: "eval",
          description: "Evaluates arbitrary Javascript.",
          category:"System",
          usage: "eval <expression>",
          permLevel: "developer"
        });
    }

    clean (text)
    {
    if (typeof(text) === "string")
        return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
    else
        return text;
    }

    async run (msg, args)
    {
        try {
            const code = args.join(" ");
            let evaled = eval(code);
            const clean = await this.clean(evaled);

            msg.channel.send(clean, {code:"xl"});
        } catch (error) {
            msg.channel.send(`\`ERROR\` \`\`\`xl\n${this.clean(error)}\n\`\`\``);
        }
    }
}

module.exports = Eval;