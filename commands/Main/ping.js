const Discord = require('discord.js');
module.exports = {
    name: 'ping',
    description: 'shows ping!',
    run: async (client, message, args) => {
        const embed = new Discord.MessageEmbed()
        .setTitle('Pong!')
        .setDescription(`Ping is ${Math.floor(msg.createdTimestamp - message.createdTimestamp)}MS\nAPI ping is ${Math.round(bot.ws.ping)}MS`)
        .setColor('34cfeb')
        message.channel.send("Pinging . . .").then(m => m.delete()).then(message.channel.send(embed))
        message.delete()
    }
}