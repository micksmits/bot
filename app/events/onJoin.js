const Canvas = require('canvas');
const Discord = require('discord.js');

module.exports = class
{
  constructor (client)
  {
    this.client = client
    this.name = 'guildMemberAdd'
  }

  async run (member) {
    let channel = await this.client.db.channel.findOne({ where: {server_id: member.guild.id, type: 'logs'}})
    if (channel) {
      member.guild.channels.get(channel.id).send(`${member.user.tag} has joined the server`, {code:""})
    }
    member.addRole('680938397044572200')

    channel = member.guild.channels.find('name', 'cafe')
    if (!channel) return

    const canvas = Canvas.createCanvas(700, 270)
    const ctx = canvas.getContext('2d')
  
    const background = await Canvas.loadImage('https://cdn.discordapp.com/attachments/680927960928354357/681185316857446425/image0.jpg')
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height)

    ctx.shadowOffsetX = 3;
    ctx.shadowOffsetY = 3;
    ctx.shadowBlur = 2;
    ctx.shadowColor = 'rgba(0, 0, 0, 1)';
    ctx.font = '30px sans-serif'
    ctx.fillStyle = '#ffffff'
    ctx.fillText('Welcome to Town', canvas.width / 3.5, canvas.height / 3)

    ctx.shadowOffsetX = 3;
    ctx.shadowOffsetY = 3;
    ctx.shadowBlur = 2;
    ctx.shadowColor = 'rgba(0, 0, 0, 1)';
    ctx.font = '40px sans-serif'
    ctx.fillStyle = '#ffffff'
    ctx.fillText(member.user.tag, canvas.width / 3.5, canvas.height / 2)

    ctx.beginPath()
    ctx.arc(100, 100, 75, 0, Math.PI * 2, true)
    ctx.closePath()
    ctx.clip()

    ctx.fillStyle = '#000000'
    ctx.beginPath()
    ctx.arc(50, 50, 75, 0, Math.PI * 2, true)
    ctx.closePath()
    ctx.fill()

    const avatar = await Canvas.loadImage(member.user.displayAvatarURL)
    ctx.drawImage(avatar, 25, 25, 150, 150)
  
    const attachment = new Discord.Attachment(canvas.toBuffer(), 'welcome-image.png')
  
    channel.send(attachment)
  }
}