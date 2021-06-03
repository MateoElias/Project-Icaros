const { MessageEmbed } = require('discord.js');
module.exports = {
  name: "av",
  description: "displays the avatar",
  run: async(client, message, args) => {
    
    const target = message.mentions.users.first()
    
    const embed = new MessageEmbed()
    .setColor('34cfeb')
    
    if(target){
      embed.setImage(target.displayAvatarURL({format: 'png', dynamic: true}))
    } else {
      embed.setImage(message.author.displayAvatarURL())
    }
    
    message.channel.send(embed)
    
  }
}
