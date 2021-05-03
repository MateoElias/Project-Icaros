const http = require('node-fetch')
const config = require('../../config.json')
const nbx = require('noblox.js')
const ms = require('ms')
const Discord = require('discord.js')

module.exports = {
    name: "nverify",
    description: "New Verification Prototype",
    run: async(client, message, args) => {

        //Get name Data
        var apiData = await http(`https://verify.nezto.re/api/roblox/${message.author.id}`); apiData = await apiData.json()
        var botMessage = new Discord.MessageEmbed()


        async function mainGroupHandler(robloxId, groupId){

            const isInGroup = await nbx.getRankInGroup(groupId, robloxId) != 0

            if(isInGroup){
                const rankName = await nbx.getRankNameInGroup(groupId, robloxId)
                const guild = message.guild

                var role = guild.roles.cache.find(r => r.name == rankName);

                try {
                    await GuildMember.roles.remove(GuildMember.roles.cache)
                    await GuildMember.roles.add(role)
                } catch (err) {
                    message.channel.send("I am unable to find a role to give.")
                }
            } else {
                GuildMember.roles.remove(GuildMember.roles.cache)
                GuildMember.roles.add(message.guild.roles.cache.find(r => r.name == 'Class D'))
            }
        }

        if (apiData.sucess == true) {

            botMessage.setTitle("Verification Successful")
            botMessage.setDescription(`You are currently verified as **${apiData.robloxUsername}**. If you wish to reverify your account, click [here](https://verify.nezto.re/discord) and follow the instructions.`)
            botMessage.setColor('4cb913')
    
            try {
                await message.member.setNickname(apiData.robloxUsername)
            } catch (err) {
                await message.channel.send("I am unable to change your nickname, please ensure I have the proper permissions")
            } finally {
                message.channel.send(botMessage)
            }

            mainGroupHandler(apiData.robloxId, config.robloxGroups.main)

        } else {
            switch (apiData.error.status) {
                case 404:
                    botMessage.setTitle("User Not Found")
                    botMessage.setColor("c70808")
                    botMessage.setDescription(`Your discord account isn't linked to a Roblox account. To verify your account, click [here](https://verify.nezto.re/discord) and follow the instructions.`)
                    break;

                case 429:
                    botMessage.setTitle("Too Many Requests")
                    botMessage.setColor("c70808")
                    botMessage.setDescription(`The API is currently receiving too many requests from various clients, please retry after **${ms(apiData.error.retryAfter, { long: true })}** seconds`)
                    break;

                default:
                    botMessage.setTitle(`${apiData.error.status} Error`)
                    botMessage.setDescription("An error has occured, please try again after a few minutes, if the error persists, contact server administration.")
                    botMessage.setColor("c70808")
            }
            message.channel.send(botMessage)
        }

    }
}
