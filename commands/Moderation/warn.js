const warns = require('../../Models/warns');
const Discord = require('discord.js');
module.exports={
    name: "warn",
    description: "Warns a user",
    category: "moderation",
    run: (client, message, args) => {
        let user = message.mentions.users.first()
        if(!user) return message.channel.send('⚠️ **Please mention the user you wish to warn** ⚠️')
        if(!args.slice(1).join(" ")) return message.channel.send('⚠️ **Please state a reason** ⚠️')
        if(user === message.author) return message.channel.send('Dont warn yourself! Love yourself!')
        warns.findOne({ Guild: message.guild.id, User: user.id },async(err,data)=>{
            if(err) console.log(err)
            if(!data){
                let newWarns = new warns({
                    User: user.id,
                    Guild: message.guild.id,
                    Warns:[
                        {
                            Moderator: message.author.username,
                            Reason: args.slice(1).join(" ")
                        }
                    ]
                })
                newWarns.save()
                var embed = new Discord.MessageEmbed()
                    .setTitle("User Warned")
                    .setDescription(`**${user.tag}** has been warned successfully.`)
                    .addField('__Reason:__', `${args.slice(1).join(" ")}`, true)
                    .addField('__Warn Count:__', "**1 Warning**", true)
                    .setColor('34cfeb')
                    .setTimestamp()
                    .setFooter('There\'s always a first time huh?')
                message.channel.send(embed)
            }else{
                data.Warns.unshift({
                    Moderator: message.author.username,
                    Reason: args.slice(1).join(" ")
                })
                data.save()
                var embed2 = new Discord.MessageEmbed()
                    .setTitle("User Warned")
                    .setDescription(`**${user.tag}** has been warned successfully.`)
                    .addField('__Reason:__', `${args.slice(1).join(" ")}`, true)
                    .addField('__Warn Count:__', `**${data.Warns.length}** warns`, true)
                    .setColor('34cfeb')
                    .setTimestamp()
                    .setFooter('I really wasn\'t expecting this from you.')

                message.channel.send(embed2)
            }
        })
    }
}