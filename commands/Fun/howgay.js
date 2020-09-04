const { MessageEmbed } = require('discord.js')
module.exports = {
  name: "howgay",
  descriptions: "Shows how gay you are lmao",
  run: async(client, message, args) => {

    async function arrayToString(arr) {
      var str = " ";
      for (let i = 0; i < arr.length - 1; i++)
        str += arr[i] + " ";
      str += arr[arr.length-1];
      return str;
    }

      var name = message.mentions.users.first || message.member.displayName()

if (args[0] && !message.mentions.users.first)
  name = arrayToString(args);
    
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
