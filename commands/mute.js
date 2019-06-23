const Command = require("../bootstrap/base");

class Mute extends Command
{
    constructor (client) {
        super(client, {
          name: "mute",
          description: "Mute a member.",
          category:"Moderation",
          usage: "mute <member> <reason>",
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
                    member.addRole('587538757402755093');
                    msg.channel.send('user muted');
                }
            }
        } catch (error) {
            //
        }
    }
}

module.exports = Mute;