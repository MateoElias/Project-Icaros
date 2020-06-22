const {
    MessageEmbed
} = require('discord.js')
module.exports = {
    name: "announce",
    description: "Announcement Command",    
    run: async(client,message,args) => {
        let chnl = message.mentions.channels.first()
        if(!chnl) return message.channel.send("Please, specify the channel where you want the announcemen to be.")
        let msg = message.content.split(" ").slice(2).join(" ")
        if(!msg) return message.channel.send("You did not specified anything to announce.")
        if(msg.lenght < 30) return message.channel.send("Text is too short to be announced.")
        const embed = new MessageEmbed()
            .setTitle(`**Announcement by **${message.member.displayName}:`)
            .setDescription(`${msg}`)
            .setColor('34cfeb')
            .setFooter("Provided by Alexandra.AIC")
            .setTimestamp()
        
        chnl.send("@here").then(chnl.edit(embed))
    }
}