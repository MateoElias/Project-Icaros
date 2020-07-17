const warns = require("../../models/warns");
const Discord = require("discord.js");
module.exports = {
  name: "warns",
  description: "Get a user's warns ",
  run: async (client, message, args) => {

    let user = message.mentions.members.first();

    var nouser = new Discord.MessageEmbed()
    .setTitle("You did not specified the user!")
    .setColor('34cfeb')
    .setFooter("Please mention the user you wish to see the warns of!")

    var nowarns = new Discord.MessageEmbed()
    .setTitle(`${user.user} does not possess any warns in this server!`)
    .setColor('34cfeb')
    .setFooter("Great! Someone that actually follows the rules!")

    if (!user) return message.channel.send(nouser);
    warns.find(
      { Guild: message.guild.id, User: user.id },
      async (err, data) => {
        if (err) console.log(err);
        if (!data.length)
          return message.channel.send(nowarns);
        let Embed = new Discord.MessageEmbed()
          .setTitle(`${user.user.tag}'s warns in ${message.guild.name}.. `)
          .setDescription(
            data.map((d) => {
              return d.Warns.map(
                (w, i) =>
                  `${i} - Moderator: ${
                    message.guild.members.cache.get(w.Moderator).user.tag
                  } Reason: ${w.Reason}`
              ).join("\n");
            })
          )
          .setColor('34cfeb')
          .setFooter('Well... That was not what I expected from you.')
        message.channel.send(Embed);
      }
    );
  },
};
