const fetch = require('node-fetch');
const { MessageEmbed } = require('discord.js')
module.exports ={
    name: "board",
    description: "Get's the trello board information",
    run: async(client, message, args) => {
        const boardId = 'guDtwUvB'
        const config = require('../../config.json')

        var data = await fetch(`https://api.trello.com/1/boards/${boardId}?key=${config.KEY}&token=${config.trelloToken}`).catch(error => message.channel.send('An error has occured: ' + error))
        data = await data.json() 

        const embed = new MessageEmbed()
        .setTitle(`${data.name}`)
        .setColor('BLACK')

        message.channel.send(embed)
    }
}