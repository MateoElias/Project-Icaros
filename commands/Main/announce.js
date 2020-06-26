const {
    MessageEmbed
} = require('discord.js')
module.exports = {
    name: "announce",
    description: "Announcement Command",
    run: async (client, message, args) => {
        let chnl = message.mentions.channels.first()
        if (!chnl) return message.channel.send("Please, specify the channel where you want the announcement to be.")
        let MSG = message.content.split(" ").slice(2).join(" ")
        if (!MSG) return message.channel.send("You did not specified anything to announce.")
        const embed = new MessageEmbed()
            .setTitle(`**Announcement by **${message.member.displayName}:`)
            .setDescription(`${MSG}`)
            .setColor('34cfeb')
            .setFooter("Provided by Alexandra.AIC")
            .setTimestamp()

            const timeout = 1000
            setTimeout(() => {
                chnl.send('@here'),
                message.delete('@here'),
                chnl.send(embed)
            }, timeout);
    }
}