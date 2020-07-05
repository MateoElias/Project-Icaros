const Discord = require('discord.js');
module.exports = {
    name: "RecEC",
    description: "Announces EC Recruitment.",
    run: async(client, message, args) => {

        // Channel Definition
        let channel = message.mentions.channels.first()
        var nochnl = new Discord.MessageEmbed()
        .setTitle('You did not specified the channel you want the announcement in.')
        .setFooter('Pleas specify the channel right after the command. "A!announce #channel"')
        .setColor('34cfeb')
        if (!channel) return message.channel.send(nochnl).then(message.delete())

        var ec = new Discord.MessageEmbed()
        .setAuthor(`Announcement by ${message.member.DisplayName}:`)
        .setTitle("Ethics Committe Application Process")
        .addFields(
            { name: 'Requirements:', value: 'Level-2, \n Maturity, \n Must not have been blacklisted from the department, \n Competent.', inline: true},
            { name: '**Further Information**', value: "Direct all concerns to the Committee Chairman." },
        )
        .setThumbnail('https://cdn.discordapp.com/attachments/667913030629195786/728322966999400599/ec.png')
        .setColor('3b503b')
            
        chnl.send("@here").then(m => m.delete());
            chnl.send(ec)
            message.delete()
    }
}