const Discord = require('discord.js')
const ms = require('ms')
module.exports = {
    name: 'mute',
    description: "Mutes a user",
    run: async (client, message, args) => {

        if(!message.member.hasPermission('KICK_MEMBERS')) return;

        // Main Variables
        const target = message.mentions.members.first()
        const time = args[0]
        const reason = message.content.split(" ").slice(3).join(" ")
        const mutedRole = message.guild.roles.cache.find(r => r.name == "Muted")

        //Control if Statements
        if(!mutedRole) return message.channel.send("I was unable to find a Muted role.")
        if(target.hasPermission('KICK_MEMBERS')) return message.channel.send("This user is also a moderator")

        if(time){
            try {
                target.roles.remove(target.roles.cache)
                target.roles.add(mutedRole)
                console.log(target.nickname + " Has been muted for " + time + ", for " + reason)

                setInterval(async function() {
                    target.roles.remove(mutedRole)
                    console.log(target.nickname + " Has been Un-Muted")
                }, ms(ms(time)))

            } catch(error) {
                console.log(error)
            }

        } else {
            try {
                target.roles.remove(target.roles.cache)
                target.roles.add(mutedRole)
            } catch (error) {
                console.log(error)
            }
        }

    }
}