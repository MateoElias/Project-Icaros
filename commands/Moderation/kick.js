const Discord = require('discord.js');
module.exports = {
    name: "kick",
    description: "Kicks a designated user out of the current guild.",
    run: async (client, message, args) => {

        var user = message.mentions.members.first()
        var member = message.guild.member(user)

        var reason = args.slice(1).join(" ");

        if (!message.member.hasPermission('KICK_MEMBERS')) return;

        var error1 = new Discord.MessageEmbed()
            .setTitle("You did not mention the user you wanted to kick!")
            .setFooter("Remember to mention the user right before the command! \"A!ban @user\" ")
            .setColor('c70808');
        if (!member) return (message.channel.send(error1)).then(message.delete())

        var admintoo = new Discord.MessageEmbed()
            .setTitle("This user is a moderator too!")
            .setFooter("The user's permissions prevent me from kicking the specified user.")
            .setColor('c70808')
         if (member.hasPermission('KICK_MEMBERS')) return message.channel.send(admintoo)

        var error2 = new Discord.MessageEmbed()
            .setTitle("You did not specified a reason!")
            .setFooter("Remember to specify the reason after the user has been mentioned! \"@user [REASON]\"")
            .setColor('c70808');
        
        if (!reason) return (message.channel.send(error2)).then(message.delete())

        var success = new Discord.MessageEmbed()
            .setTitle("Success!")
            .setDescription(`**${member.tag}** has been kicked successfully. \n You can see more of the details below:`)
            .addFields({
                name: "__Moderator:__",
                value: `\`${message.member.displayName}\``,
                inline: true
            }, {
                name: "__Reason:__",
                value: `${reason}`,
                inline: true
            })
            .setFooter("Welp! Try not to be like that guy!")
            .setColor('4cb913');

        var error3 = new Discord.MessageEmbed()
            .setTitle("Error")
            .setDescription("I was unable to find that user, maybe it's not on the server anymore.")
            .setFooter("Remember to properly mention the user, or check if the user is on the server.")
            .setColor('c70808');


        member.kick({ reason: reason })
        .then(() => {
            message.channel.send(success);
        }).catch((e) => {
            console.log(e)
            message.channel.send(error3)
        });

    }

}
