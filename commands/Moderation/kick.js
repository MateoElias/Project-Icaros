const Discord = require('discord.js');
module.exports = {
    name: "kick",
    description: "Kicks a designated user out of the current guild.",
    run: async (client, message, args) => {

        if (!message.member.hasPermission('KICK_MEMBERS')) return;

        let user = message.mentions.users.first()
        const member = message.guild.member(user);

        if (member === message.author) return; 

        var permerror = new Discord.MessageEmbed()
            .setTitle("I cannot kick that user!")
            .setFooter("I cannot kick this user, most likely because that user is also a mod, check the user's permissions and try again.")
            .setColor('34cfeb')

        if(user.hasPermission('KICK_MEMBERS')) return (message.channel.send(permerror)).then(message.delete())

        var error1 = new Discord.MessageEmbed()
            .setTitle("You did not mention the user you wanted to kick!")
            .setFooter("Remember to mention the user right before the command! \"A!kick @user\" ")
            .setColor('34cfeb')

        if (!user) return (message.channel.send(error1)).then(message.delete())

        let reason = args.slice(1).join(" ")
        var error2 = new Discord.MessageEmbed()
            .setTitle("You did not specified a reason!")
            .setFooter("Remember to specify the reason after the user has been mentioned! \"@user [REASON]\"")
            .setColor('34cfeb')

        if (!reason) return (message.channel.send(error2)).then(message.delete())

        var success = new Discord.MessageEmbed()
            .setTitle("Success!")
            .setDescription(`**${user.tag}** has been kicked successfully. \n You can see more of the details below:`)
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
            await member.kick(reason);
            await message.channel.send(success)
        } catch (e) {
            return message.channel.send(error3)
        }
	message.delete()
    }

}