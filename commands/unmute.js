const Command = require("../bootstrap/base");

class Unmute extends Command
{
    constructor (client) {
        super(client, {
          name: "unmute",
          description: "Unmute a member.",
          category:"Moderation",
          usage: "unmute <member>",
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
                    if (!member.roles.find('id', '587538757402755093')) return msg.channel.send('user is not muted');

                    member.removeRole('587538757402755093');
                    msg.channel.send('user unmuted');
                    msg.channel.guild.channels.find('name', 'logs').send(`${member.user.tag} has been unmuted by ${msg.author.tag}`, {code:""});
                }
            }
        } catch (error) {
            //
        }
    }
}

module.exports = Unmute;