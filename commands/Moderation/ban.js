const Discord = require('discord.js');
module.exports = {
    name: 'ban',
    description: "Bans a specific user out of the current guild.",
    run: async (client, message, args) => {

        if (message.member.hasPermission('BAN_MEMBERS')) return message.delete()

        let user = message.mentions.users.first();
        let member = message.guild.member(user);
        var nouser = new Discord.MessageEmbed()
            .setTitle("You did not mentioned the user you wanted to ban!")
            .setFooter("Remember to mention the user right before the command! \"A!ban @user\" ")
            .setColor('34cfeb')
        if (!user) return message.channel.send(nouser).then(message.delete())


        var modtoo = new Discord.MessageEmbed()
            .setTitle("I cannot ban that user!")
            .setFooter("I cannot ban this user, most likely because that user is also a mod, check the user's permissions and try again.")
            .setColor('34cfeb')
        if (user.hasPermission('BAN_MEMBERS')) return message.channel.send(modtoo).then(message.delete())


        let reason = args.slice(1).join(" ");
        var noreason = new Discord.MessageEmbed()
            .setTitle("You did not specified a reason!")
            .setFooter("Remember to specify the reason after the user has been mentioned! \"@user [REASON]\"")
            .setColor('34cfeb')
        if (!reason) return message.channel.send(noreason).then(message.delete())


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
            .setFooter("Did we really had to go that far?")
            .setColor('34cfeb')

        var notinserver = new Discord.MessageEmbed()
            .setTitle("Error")
            .setDescription("I was unable to find that user, maybe it's not on the server anymore.")
            .setFooter("Remember to properly mention the user, or check if the user is on the server.")
            .setColor('34cfeb')

        try {
            await member.ban(reason).then(message.delete());
            await message.channel.send(success).then(message.delete())
        } catch (e) {
            return message.channel.send(notinserver).then(message.delete())
        }

    }
}