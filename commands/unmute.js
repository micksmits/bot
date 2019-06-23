const Command = require("../bootstrap/base");

class Unmute extends Command
{
    constructor (client) {
        super(client, {
          name: "unmute",
          description: "Unmute a member.",
          category:"Moderation",
          usage: "unmute <member>",
          permLevel: "admin"
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
                    member.removeRole('587538757402755093');
                    msg.channel.send('user unmuted');
                }
            }
        } catch (error) {
            //
        }
    }
}

module.exports = Unmute;