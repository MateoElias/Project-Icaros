const warns = require('../../Models/warns');
const Discord = require('discord.js');
module.exports={
    name: "warn",
    description: "Warns a user",
    category: "moderation",
    run: (client, message, args) => {
        let user = message.mentions.users.first()
	    if(user === message.author) return;
        if(!user) return message.channel.send('⚠️ **Please mention the user you wish to warn** ⚠️')
        if(!args.slice(1).join(" ")) return message.channel.send('⚠️ **Please state a reason** ⚠️')
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

                    var dm = new Discord.MessageEmbed()
                    .setAuthor(`You have been warned at: ${message.guild.name}`, message.guild.iconURL())
                    .setDescription(`You have recieved a warning in ${message.guild.name}! \n You can see more of the details below`)
                    .addFields(
                        { name: '__Moderator:__', value: `\` ${message.member.displayName} \``},
                        { name: '__Reason:__', value: `**${args.slice(1).join(" ")}**` },
                        { name: '__Warn Count:__', value: `1 warn.` }
                    )
                    .setColor('34cfeb')
                    .setFooter('Look I really don\' want to tell you this again.')
                    .setTimestamp()

                message.channel.send(embed),
                (user.send(dm))
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

                var dm2 = new Discord.MessageEmbed()
                    .setAuthor(`You have been warned at: ${message.guild.name}`, message.guild.iconURL())
                    .setDescription(`You have recieved a warning in ${message.guild.name}! \n You can see more of the details below`)
                    .addFields(
                        { name: '__Moderator:__', value: `\` ${message.member.displayName} \``},
                        { name: '__Reason:__', value: `**${args.slice(1).join(" ")}**` },
                        { name: '__Warn Count:__', value: `${data.Warns.length} warns.` }
                    )
                    .setColor('34cfeb')
                    .setFooter('You again?!? Seriously??')
                    .setTimestamp()

                message.channel.send(embed2),
                (user.send(dm2)),
                message.delete()
            }
        })
    }
}