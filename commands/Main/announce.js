const {
    MessageEmbed
} = require('discord.js')
module.exports = {
    name: "announce",
    description: "Announcement Command",
    run: async (client, message, args) => {

        // Channel Definition
        let chnl = message.mentions.channels.first()
        if (!chnl) return message.channel.send("Please, specify the channel where you want the announcemen to be.")
        
        //Message Definition
        let MSG = message.content.split(" ").slice(2).join(" ")
        var short = new MessageEmbed()
        .setTitle('Your announcement is too short to be announced.')
        .setFooter('Make sure your your announcement is longer than 30 characters!')
        .setColor('34cfeb')
        if (MSG.length < 30) return message.channel.send(short)
        if (!MSG) return message.channel.send("You did not specified anything to announce.")

        const embed = new MessageEmbed()
            .setTitle(`**Announcement by **${message.member.displayName}:`)
            .setDescription(`${MSG}`)
            .setColor('34cfeb')
            .setFooter("Provided by Alexandra.AIC")
            .setTimestamp()

            chnl.send("@here").then(m => m.delete());
            chnl.send(embed)
            message.delete()
    }
}