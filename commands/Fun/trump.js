const { MessageEmbed } = require('discord.js');
const fetch = require('node-fetch')
module.exports = {
    name: "trump",
    description: "Makes fake donald trump posts",
    run: async (client, message, args) => {

        const MSG = message.content.split(" ").slice(1).join(" ");
        if(!MSG) return message.channel.send("Please input any message")

        const data = await fetch(`https://api.no-api-key.com/api/v2/trump/?message=${MSG}`).catch(err => message.channel.send(err))
        
        const embed = new MessageEmbed()
        .setColor('34cfeb')
        .setImage(data.url)

        message.channel.send(embed)
        message.delete()
            
    }
}
