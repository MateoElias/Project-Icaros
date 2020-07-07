const {
    MessageEmbed
} = require('discord.js');
module.exports = {
    name: "announceec",
    description: "EC Departmental Announcement",
    run: async (client, message, args) => {

        // Channel Definition
        let chnl = message.mentions.channels.first()
        var nochnl = new MessageEmbed()
            .setTitle('You did not specified the channel you want the announcement in.')
            .setFooter('Please specify the channel right after the command. "A!announceec #channel"')
            .setColor('34cfeb')
        if (!chnl) return message.channel.send(nochnl).then(message.delete())

        // Message Definition
        let MSG = message.content.split(" ").slice(2).join(" ")

        var ethics = new MessageEmbed()
            .setAuthor(`Announcement by ${message.member.displayName}:`)
            .setTitle("Ethics Committe Application Process")
            .addFields({
                name: 'Requirements:',
                value: 'Level-2, \n Maturity, \n Must not have been blacklisted from the department, \n Competent.',
                inline: true
            }, {
                name: '**Further Information**',
                value: "Direct all concerns to the Committee Chairman.",
                inline: true
            }, )
            .setFooter("Recruitment Announcement")
            .setThumbnail('https://cdn.discordapp.com/attachments/667913030629195786/728322966999400599/ec.png')
            .setColor('3b503b')

            if (!MSG) chnl.send("@everyone").then(m => m.delete()).then(chnl.send(ethics)).then(message.delete())

        var ethics2 = new MessageEmbed()
            .setAuthor(`Announcement by ${message.member.displayName}:`)
            .setTitle("Ethics Committe Application Process")
            .addFields({
                name: 'Requirements:',
                value: 'Level-2, \n Maturity, \n Must not have been blacklisted from the department, \n Competent.',
                inline: true
            }, {
                name: '**Further Information**',
                value: MSG,
                inline: true
            }, )
            .setFooter("Recruitment Announcement")
            .setThumbnail('https://cdn.discordapp.com/attachments/667913030629195786/728322966999400599/ec.png')
            .setColor('3b503b')

        chnl.send("@everyone").then(m => m.delete()).then(chnl.send(ethics2))
        message.delete()

    }
}