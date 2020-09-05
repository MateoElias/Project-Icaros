const { MessageEmbed } = require('discord.js')
module.exports = {
  name: "howgay",
  descriptions: "Shows how gay you are lmao",
  run: async(client, message, args) => {

    var percent = Math.floor(Math.random() * 100);    
    
    if(!name) {
    var resp = new MessageEmbed()
        .setTitle("Homosexuality Rate")
        .setColor('RANDOM')
        .setDescription(`🏳️‍🌈 You are ${percent}% gay 🏳️‍🌈`)
     message.channel.send(resp)
    } else { 
      resp = new MessageEmbed()
        .setTitle("Homosexuality Rate")
        .setColor('RANDOM')
        .setDescription(`🏳️‍🌈 ${message.member.displayName} is ${percent}% gay 🏳️‍🌈`)
      message.channel.send(resp)
    }
  }
}
