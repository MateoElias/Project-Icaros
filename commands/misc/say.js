const { MessageEmbed } = require('discord.js');
module.exports={
    name: "dm",
    description: "DMs whatever you want to a specified user",
    run: async(client, message, args) => {
        let User = message.mentions.users.first()

        let content = args.slice(1).join(" ")

        let dm = new MessageEmbed()
        .setDescription(content)
        .setColor('34cfeb')

        User.send(dm)
        message.delete()
    } 
}