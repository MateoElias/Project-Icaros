const Discord = require('discord.js');
module.exports = {
    name: "kick",
    description: "Kicks a designated user out of the current guild.",
    run: async (client, message, args) => {

        if (!message.member.hasPermission('KICK_MEMBERS')) return;


        let user = message.mentions.users.first()
        const member = message.guild.member(user);
        var error1 = new Discord.MessageEmbed()
            .setTitle("You did not mentioned the user you wanted to kick!")
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

        var dm = new Discord.MessageEmbed()
            .setAuthor(`You have been kicked from: ${message.guild.name}`, message.guild.iconURL())
            .setDescription(`You have recieved a warning in ${message.guild.name}! \n You can see more of the details below`)
            .addFields({
                name: '__Moderator:__',
                value: `\` ${message.member.displayName} \``
            }, {
                name: '__Reason:__',
                value: `**${reason}**`
            })
            .setColor('34cfeb')
            .setFooter('Well, that was one wayt to go, wasn\'t it?')
            .setTimestamp()
        member.send(dm)

        try {
            await member.kick(reason).then(user.send(dm));
            await message.channel.send(success)
        } catch (e) {
            return message.channel.send(error3)
        }
	message.delete()
    }

}