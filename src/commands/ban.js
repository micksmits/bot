const Command = require("../bootstrap/base");

class Ban extends Command
{
    constructor (client) {
        super(client, {
          name: "ban",
          description: "Ban a member from the guild.",
          category:"Moderation",
          usage: "ban <member> <reason>",
          permLevel: "mod"
        });
    }

    async run (msg, args)
    {
        try {
            const user = msg.mentions.users.first();

            if (user) {
                args.shift();
                const reasonToBan = args.join(' ');
                const member = msg.guild.member(user);

                if (member) {
                    member.ban({
                        reason: reasonToBan,
                    }).then(() => {
                        msg.channel.send('member banned');
                    });
                }
            }
        } catch (error) {
            //
        }
    }
}

module.exports = Ban;