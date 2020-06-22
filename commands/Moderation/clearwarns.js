const warns = require("../../models/warns");
const Discord = require('discord.js');
module.exports = {
  name: "clearwarns",
  description: "delete warns of a user",
  category: "moderation",
  usage: "<User mention> <Reason>",
  run: async (client, message, args) => {
    let user = message.mentions.users.first();
    if (!user){
        return message.channel.send(`⚠️ **Please state the user you want to clear warns of!** ⚠️`);
    } 

    warns.findOne(
      { Guild: message.guild.id, User: user.id },
      async (err, data) => {
        if (err) console.log(err);
        if (!data) {
          let newWarns = new warns({
            User: user.id,
            Guild: message.guild.id,
            Warns: [
              {
                Moderator: message.author.id,
                Reason: args.slice(1).join(" "),
              },
            ],
          });
          newWarns.delete();
          const embed2 = new Discord.MessageEmbed()
            .setTitle('Warns cleared!')
            .setDescription(`${user}'s warns have been cleared by ${message.author}!`)
            .setColor('34cfeb')
            .setFooter('Forgive and forget, that\'s what I always say!')
            .setTimestamp()

          message.channel.send(
           embed2)
        } else {
          data.Warns.unshift({
            Moderator: message.author.id,
            Reason: args.slice(1).join(" "),
          });
          data.delete();
          const embed = new Discord.MessageEmbed()
            .setTitle('Warns cleared!')
            .setDescription(`${user}'s warns have been cleared by ${message.author}!`)
            .setColor('34cfeb')
            .setFooter('Forgive and forget, that\'s what I always say!')
            .setTimestamp()
          message.channel.send(embed)
        }
      }
    );
  },
};