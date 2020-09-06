const Discord = require('discord.js');
module.exports = {
    name: 'ping',
    description: 'shows ping!',
    timeout: 10000,
    run: async (client, message, args) => {
    const pinging1 = new Discord.MessageEmbed()
        .setTitle("Pinging . . .")
        .setColor('ffbb17')
    
      const pinged = new Discord.MessageEmbed()
        .setTitle("Pong!")
        .setColor("4cb913")
        .addFields(
            {name: "__**API Latency:**__", value: `${Math.round(client.ws.ping)}ms`}
        )    
      const pinging = await message.channel.send(pinging1)
        pinging.edit(pinged)
    }
  }
