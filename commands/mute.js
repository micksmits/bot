const Command = require("../bootstrap/base");

class Mute extends Command
{
    constructor (client) {
        super(client, {
          name: "mute",
          description: "Mute a member.",
          category:"Moderation",
          usage: "mute <member> <reason>",
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
                    if (member.roles.find('id', '587538757402755093')) return msg.channel.send('user is already muted');

                    member.addRole('587538757402755093');
                    msg.channel.send('user muted');
                    msg.channel.guild.channels.find('name', 'logs').send(`${member.user.tag} has been muted by ${msg.author.tag}`, {code:""});
                }
            }
        } catch (error) {
            //
        }
    }
}

module.exports = Mute;