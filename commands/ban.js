const Discord = require('discord.js');
const client = new Discord.Client();

module.exports = {
    perms: ['Big Admin', 'Admin'],
    name: 'ban',
    execute(msg, args) {
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
                        msg.channel.send(`Haha ur banned FAG, ${user.tag}!`);
                    });
                }
            }
        } catch (error) {
            msg.channel.send(`\`ERROR\` \`\`\`xl\n${clean(error)}\n\`\`\``);
        }
    }
}