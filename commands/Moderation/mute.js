const Discord = require('discord.js')
const ms = require('ms')
module.exports = {
    name: 'mute',
    description: "Mutes a user",
    run: async (client, message, args) => {

        const User = message.mentions.users.first();
        var nouser = new Discord.MessageEmbed()
            .setTitle("You did not mention a user!")
            .setDescription("Remember to specify the user you want to mute.")
            .setFooter("A!mute @OliCalds")
            .setColor('34cfeb')
        if (!User) return message.channel.send(nouser).then(message.delete)

        const mutedrole = message.guild.roles.cache.get('681953663664783371');

        const mutedalready = new Discord.MessageEmbed()
            .setTitle('This user has been muted already!')
            .setFooter('At least have some mercy with this guy!')
            .setColor('34cfeb')
        if(User.role.cache.some(role => role.name === 'Muted')) return message.channel.send(mutedalready)

        const success = new Discord.MessageEmbed()
        .setTitle('User muted!')
        .setDescription(`${User} has been muted successfully!`)
        .setFooter('Bigmouth!')
        .setColor('34cfeb')

        const DM = new Discord.MessageEmbed()
        .setTitle('You have been muted')
        .setDescription(`You have been muted in ${message.guild.name}`)
        .addField('__Moderator:__', message.member.displayName, true)
        .setFooter('Well that was unfortunate.')
        .setColor('34cfeb')

        const noDM = new Discord.MessageEmbed()
        .setTitle('I was unable to send the Direct Message option due to the user having its DMs closed.')
        .setColor('c70808')
        .setFooter('That\'s rude y\'know?')

        User.roles.add(mutedrole)
        message.channel.send(success)
        message.delete()
        try{
           await User.send(DM)
        } catch(e) {
            await message.channel.send(noDM)
        }
    }
}