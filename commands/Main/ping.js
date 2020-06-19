const Discord = require('discord.js');
module.exports = {
    name: 'ping',
    description: 'shows ping!',
    run: async (bot, message, args) => {
        const msg = await message.channel.send('Pinging...')
        const embed = new Discord.MessageEmbed()
        .setTitle(':ping_pong:Pong!:ping_pong:')
        .setDescription(`Ping is ${Math.floor(msg.createdTimestamp - message.createdTimestamp)}MS\nAPI ping is ${Math.round(bot.ws.ping)}MS`)
        .setColor('34cfeb')
        msg.edit(embed)
    }
    

}