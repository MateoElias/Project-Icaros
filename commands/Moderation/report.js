const {
    MessageEmbed
} = require('discord.js');
module.exports = {
    name: "report",
    description: "Reports a user, due to either ROBLOX or Discord rule violation",
    run: async (client, message, args) => {

        let User = message.mentions.users.first() || args[0]

        var nouser = new MessageEmbed()
            .setTitle("You did not mentioned a user!")
            .setFooter("You must mention the user to report, in order to be processed.")
            .setColor("c70808")
        if (!User) return message.channel.send(nouser).then(message.delete())

        let Avatar = User.displayAvatarURL()
        let Channel = message.guild.channels.cache.find(
            (ch) => ch.name === "reports"
        );
        if (!Channel)
            return;

        let Reason = args.slice(1).join(" ");

        let Embed = new MessageEmbed()
            .setTitle(`New report!`)
            .setDescription(
                `The moderator \`${message.author.tag}\` has reported the user \`${User}\`! `
            )
            .setColor('4cb913')
            .setThumbnail(Avatar)
            .addFields({
                name: "Moderator",
                value: `${message.member.displayName}`,
                inline: true
            }, {
                name: "Reported ID",
                value: `${User.id}`,
                inline: true
            }, {
                name: "Reported",
                value: `${User.tag}`,
                inline: true
            }, {
                name: "Reason",
                value: `\`${Reason}\``,
                inline: true
            }, {
                name: "Date (M/D/Y)",
                value: `${new Intl.DateTimeFormat("en-US").format(Date.now())}`,
                inline: true,
            });
        Channel.send(Embed)
        
        let Embed2 = new MessageEmbed()
            .setTitle(`New report!`)
            .setDescription(
                `The moderator \`${message.author.tag}\` has reported the user \`${User}\`! `
            )
            .setColor('4cb913')
            .addFields({
                name: "Moderator",
                value: `${message.member.displayName}`,
                inline: true
            }, {
                name: "Reported",
                value: `${User}`,
                inline: true
            }, {
                name: "Reason",
                value: `\`${Reason}\``,
                inline: true
            }, {
                name: "Date (M/D/Y)",
                value: `${new Intl.DateTimeFormat("en-US").format(Date.now())}`,
                inline: true,
            });
        if(User == args[0]) return Channel.send(Embed2).then(message.delete())
        
        message.delete()
    }
}
