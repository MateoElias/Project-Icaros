const Discord = require('discord.js');
module.exports = {
    name: "ban",
    description: "Bans a designated user out of the current guild.",
    run: async (client, message, args) => {

        if (!message.member.hasPermission('BAN_MEMBERS')) return;

        var user = message.mentions.members.first()
        const member = message.guild.member(user)

        if(user === message.author) return;

        var error1 = new Discord.MessageEmbed()
            .setTitle("You did not mention the user you wanted to ban!")
            .setFooter("Remember to mention the user right before the command! \"A!ban @user\" ")
            .setColor('34cfeb')

        if (!member) return (message.channel.send(error1)).then(message.delete())

        var admintoo = new Discord.MessageEmbed()
        .setTitle("This user is a moderator too!")
        .setFooter("The user's permissions prevent me from banning the specified user.")
        .setColor('34cfeb')
        if(member.hasPermission('BAN_MEMBERS')) return message.channel.send(admintoo)

        let reason = args.slice(1).join(" ");
        var error2 = new Discord.MessageEmbed()
            .setTitle("You did not specified a reason!")
            .setFooter("Remember to specify the reason after the user has been mentioned! \"@user [REASON]\"")
            .setColor('34cfeb')

        if (!reason) return (message.channel.send(error2)).then(message.delete())

        var success = new Discord.MessageEmbed()
        .setTitle("Success!")
            .setDescription(`**${user.tag}** has been banned successfully. \n You can see more of the details below:`)
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
            .setColor('34cfeb')

            var error3 = new Discord.MessageEmbed()
            .setTitle("Error")
            .setDescription("I was unable to find that user, maybe it's not on the server anymore.")
            .setFooter("Remember to properly mention the user, or check if the user is on the server.")
            .setColor('34cfeb')
        
        try {
       await member.ban({reason: reason});
       await message.channel.send(success);
     } catch (e) {
       return message.channel.send(error3)
     }

    }

}
