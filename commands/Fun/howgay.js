const { MessageEmbed } = require('discord.js')
module.exports = {
  name: "howgay",
  descriptions: "Shows how gay you are lmao",
  run: async(client, message, args) => {
    
    var name = message.mentions.users.first()
    
      var percent = Math.floor(Math.random() * 100);
      var resp = new MessageEmbed()
        .setTitle("Homosexuality Rate")
        .setColor('RANDOM')
        .setDescription(`🏳️‍🌈 ${name.username} is ${percent}% gay 🏳️‍🌈`);
    
    if(!name) {
    resp = new MessageEmbed()
        .setTitle("Homosexuality Rate")
        .setColor('RANDOM')
        .setDescription(`🏳️‍🌈 You are ${percent}% gay 🏳️‍🌈`);
     message.channel.send(resp)
    } else { 
      message.channel.send(resp)
    }
  }
}
