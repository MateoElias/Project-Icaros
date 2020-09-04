const { MessageEmbed } = require('discord.js')
module.exports = {
  name: "howgay",
  descriptions: "Shows how gay you are lmao",
  run: async(client, message, args) => {

      name = const name = message.mentions.users.first(); || message.member.displayName();
    
      var percent = Math.floor(Math.random() * 100);
    
      var resp = new MessageEmbed()
        .setTitle("Homosexuality Rate")
        .setColor('RANDOM')
        .setDescription(`🏳️‍🌈 ${name} is ${percent}% gay 🏳️‍🌈`);
    
      if (message.channel)
        message.channel.send(resp);
      else
        message.reply(resp);
    
      return;
  }
}
