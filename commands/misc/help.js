const {
    MessageEmbed
} = require('discord.js');
module.exports = {
    name: 'help',
    description: 'DMs you the list of commands and the usage of it.',
    run: async (client, message, args) => {
        const help = new MessageEmbed()
            .setTitle('Command List')
            .setDescription(`Hello ${message.member.displayName}! I'm here to assist you with my usage! \n I will make a list of commands for you below:`)
            .addFields({
                    name: '__Ping:__',
                    value: 'Returns "Pong" plus your ping and API ping. \n `A!ping`',
                    inline: true
                }, {
                    name: '__Announce:__',
                    value: 'Announces a whatever message needed in the desired channel. \n `A!announce #channel here/everyone/null [MESSAGE]`',
                    inline: true
                }, {
                    name: '__Warn:__',
                    value: 'Warns a user. \n `A!warn @OliCals [REASON]`',
                    inline: true
                }, {
                    name: '__Kick:__',
                    value: 'Kicks any user. \n `A!kick @OliCalds [REASON]`',
                    inline: true
                }, {
                    name: '__Ban:__',
                    value: 'Bans any user. \n `A!ban @OliCalds [REASON]`',
                    inline: true
                }, {
                    name: '__Report:__',
                    value: 'Reports any user for moderators to take action. \n `A!report @OliCalds [REASON + EVIDENCE]`',
                    inline: true
                }, {
                    name: '__Clearwarns:__',
                    value: 'Clears the warns of a designated user. \n `A!clearwarns @OliCalds`',
                    inline: true
                }

            )
            .setColor('34cfeb')
            .setFooter("Always here to help!")
            .setTimestamp()

            const dmclosed = new MessageEmbed()
            .setTitle("Error")
            .setDescription("I was unable to send you the command list, this may be caused do to you having your Direct Messages closed, disabled Direct messages from server members or you have blocked me (rude \>:( ).")
            .setColor('c70808')
            
            const success = new MessageEmbed()
            .setTitle("Check your DMs!")
            .setColor("34cfeb")
        try{
            await message.author.send(help);
            await message.channel.send(success)
        } catch(e) {
            await message.channel.send(dmclosed)
        }
        message.delete()
    }
}
