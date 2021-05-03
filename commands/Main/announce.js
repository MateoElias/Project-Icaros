const Discord = require('discord.js');
module.exports = {
    name: "announce",
    description: "New announcement command",
    run: async (client, message, args) => {
        
        if (!message.member.hasPermission('KICK_MEMBERS')) return;

        const sending1 = new Discord.MessageEmbed()
        .setTitle("Sending . . .")
        .setColor('ffbb17')

        var sent = new Discord.MessageEmbed()
        .setTitle("Success!")
        .setDescription('Your announcement has been published successfully.')
        .setColor('4cb913')
    
        async function Sending(){
            var sending = await message.channel.send(sending1)
            sending.edit(sent)
            setTimeout(async () => {await sending.delete();}, 6000);
            message.delete();
        }

        //VARIABLE DEFINITION
        var MSG = message.content.split(" ").slice(3).join(" ")
        var short = new Discord.MessageEmbed()
        .setTitle('Your announcement is too short to be announced.')
        .setFooter('Make sure your your announcement is longer than 10 characters!')
        .setColor('c70808')
        if (MSG.length < 10) return message.channel.send(short).then(message.delete())
        if (!MSG) return message.channel.send("You did not specified anything to announce.").then(message.delete())
        const chnl = message.mentions.channels.first();
        var nochnl = new Discord.MessageEmbed()
        .setTitle('You did not specified the channel you want the announcement in.')
        .setFooter('Pleas specify the channel right after the command. "A!announce #channel"')
        .setColor('c70808')
        if (!chnl) return message.channel.send(nochnl).then(message.delete())
        let thing = args[1]
        let ping = thing.toLowerCase()
        

        //ANNOUNCEMENT
        const embed = new Discord.MessageEmbed()
            .setTitle(`**Announcement by **${message.member.displayName}:`)
            .setAuthor(".|SCPF|. Special Containment Procedures Foundation", message.guild.iconURL(), 'https://www.roblox.com/groups/5137119/Special-Containment-Procedures-Foundation-SCPF#!/about')
            .setDescription(`${MSG}`)
            .setColor('34cfeb')
            .setTimestamp()
            .setFooter("Alexandra.AIC | Developed by: O5-6", 'https://cdn.discordapp.com/attachments/667913030629195786/728325820715892736/Alexandra.png')

        const noping = new Discord.MessageEmbed()
            .setTitle("You did not specify the ping to utilize!")
            .setFooter("A!announce #channel `<here/all/null>`")
            .setColor('c70808')

        if(!ping) return message.channel.send(noping) && message.delete()

        async function SHIT(){
            switch(ping.toLowerCase()) {
                case 'here':
                    ping = '@here'
                    Sending()
                    chnl.send(ping).then(m => m.delete())
                    if(chnl.type === 'news'){
                        chnl.send(embed).then(cross => cross.crosspost()).catch(err => console.log(err))
                    } else { chnl.send(embed) }
                    message.delete()
                break;
                case 'everyone' || 'all':
                    ping = '@everyone'
                    Sending()
                    chnl.send(ping).then(m => m.delete())
                    if(chnl.type === 'news'){
                        chnl.send(embed).then(cross => cross.crosspost()).catch(err => console.log(err))
                    } else { chnl.send(embed) }
                    message.delete()
                break;
                case 'null':
                    Sending()
                    if(chnl.type === 'news'){
                        chnl.send(embed).then(cross => cross.crosspost()).catch(err => console.log(err))
                    } else { chnl.send(embed) }
            }
        }
        
      SHIT()
    }
}
