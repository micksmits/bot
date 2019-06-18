const Discord = require('discord.js');
const client = new Discord.Client();
const os = require('os');

module.exports = {
    perms: ['dev'],
    name: 'loads',
    execute(msg, args) {
        try {
            const avg = os.loadavg();

            msg.reply(`load averages 1: **${avg[0].toFixed(2)}**  5: **${avg[1].toFixed(2)}**  15: **${avg[2].toFixed(2)}**`);
        } catch (error) {
            msg.channel.send(`\`ERROR\` \`\`\`xl\n${clean(error)}\n\`\`\``);
        }
    }
}