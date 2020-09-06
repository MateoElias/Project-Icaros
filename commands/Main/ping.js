const Discord = require('discord.js');
module.exports = {
    name: 'ping',
    description: 'shows ping!',
    run: async (client, message, args) => {
    const pinging1 = new Discord.MessageEmbed()
        .setTitle("Pinging . . .")
        .setColor('ffbb17')
    
      const pinged = new Discord.MessageEmbed()
        .setTitle("Pong!")
        .setColor("4cb913")
        .addFields(
            {name: "__**Latency:**__", value: `${Math.floor(msg.createdTimestamp - message.createdTimestamp)}ms`},
            {name: "__**API Latency:**__", value: `${Math.round(client.ws.ping)}ms`}
        )    
      const pinging = await message.channel.send(pinging)
        pinging.edit(pinged)
    });
  },
};
