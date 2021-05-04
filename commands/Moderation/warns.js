const warns = require("../../Models/warns.js");
const { MessageEmbed } = require("discord.js");
module.exports = {
  name: "warns",
  description: "Get a user's warns in the guild",
  category: "moderation",
  run: async (bot, message, args) => {
    
    if (!message.member.hasPermission('KICK_MEMBERS')) return;
    
    let user = message.mentions.members.first();
    if (!user) return message.channel.send(`No user specified`);
    warns.find(
      { Guild: message.guild.id, User: user.id },
      async (err, data) => {
        if (err) console.log(err);
        if (!data.length)
          return message.channel.send(
            `${user.user.tag} has not got any warns in this guild!`
          );
        
        //console.log(data)
        //console.log(user)
        let Embed = new MessageEmbed()
          .setTitle(`${user.nickname}'s warns in ${message.guild.name}:`)
          .setColor('34cfeb')
          .setDescription(
            data.map((d) => {
              return d.Warns.map(
                (w, i) =>
                  `${i} - **Moderator**: ${
                    message.guild.members.cache.find(n => n.username == w.Moderator).nickname
                  } **Reason:** __${w.Reason}__`
              ).join("\n");
            })
          );
        message.channel.send(Embed);
      }
    );
  },
};
