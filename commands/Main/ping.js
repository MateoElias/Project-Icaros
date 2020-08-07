const Discord = require('discord.js');
module.exports = {
    name: 'ping',
    description: 'shows ping!',
    run: async (client, message, args) => {
        message.channel.send(`Pinging....`).then((msg) => {
      const _ = new Discord.MessageEmbed()
        .setTitle("Pong!")
        .setDescription(
          `Pong!\nLatency is ${Math.floor(
            msg.createdTimestamp - message.createdTimestamp
          )}ms\nAPI Latency is ${Math.round(bot.ws.ping)}ms`
        )
        .setColor("34cfeb");
      msg.edit(_);
    });
  },
};