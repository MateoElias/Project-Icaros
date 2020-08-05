const {
    MessageEmbed
} = require('discord.js')
module.exports = {
    name: "announce",
    description: "Announcement Command",
    run: async (client, message, args) => {

        // Channel Definition
        let chnl = message.mentions.channels.first()
	var nochnl = new MessageEmbed()
        .setTitle('You did not specified the channel you want the announcement in.')
        .setFooter('Pleas specify the channel right after the command. "A!announce #channel"')
        .setColor('34cfeb')
        if (!chnl) return message.channel.send(nochnl).then(message.delete())

        // Channel Responses
        const sending1 = new MessageEmbed()
        .setTitle("Sending . . .")
        .setColor('ffbb17')

        const sent = new MessageEmbed()
        .setTitle("Success!")
        .setDescription(`Your announcement has been published successfully in ${chnl}`)
        .setColor('4cb913')

        //Message Definition
        let MSG = message.content.split(" ").slice(2).join(" ")
        var short = new MessageEmbed()
        .setTitle('Your announcement is too short to be announced.')
        .setFooter('Make sure your your announcement is longer than 10 characters!')
        .setColor('34cfeb')
        if (MSG.length < 10) return message.channel.send(short).then(message.delete())
        if (!MSG) return message.channel.send("You did not specified anything to announce.").then(message.delete())

        const embed = new MessageEmbed()
            .setTitle(`**Announcement by **${message.member.displayName}:`)
            .setAuthor(".|SCPF|. Special Containment Procedures Foundation", message.guild.iconURL(), 'https://www.roblox.com/groups/5137119/Special-Containment-Procedures-Foundation-SCPF#!/about')
            .setDescription(`${MSG}`)
            .setColor('34cfeb')
            .setTimestamp()
            .setFooter("Alexandra.AIC | Developed by: O5-6", 'https://cdn.discordapp.com/attachments/667913030629195786/728325820715892736/Alexandra.png')

            const sending = await message.channel.send(sending1)
            sending.edit(sent)
            chnl.send("@here").then(m => m.delete());
            chnl.send(embed)
            message.delete()
            console.log(args[3])
    }
}
