const noblox = require('noblox.js');
const Discord = require('discord.js');
const cookie = process.env.securityKey;
const groupid = 5137119;
const maximumRank = 80; 
module.exports = {
    name: "rank",
    description: "Ranks a user in a noblox group",
    category: "Ranking",
    run: (client, message, args) => {

        async function cookieLogin() {
            try {
                await noblox.cookieLogin(cookie);
            } catch (err) {
                login();
                return console.log('There was an error while logging into the account with the cookie: ' + err);
            }
            return console.log('Logged in!');
        }

        const args = message.content.slice(prefix.length).split(' ');
        let username = args[1];
        var nouser = new Discord.MessageEmbed()
            .setTitle("You did not specified a user!")
            .setFooter("Be sure to type their name, not to ping them.")
            .setColor('34cfeb')
        if (!username) {
            return message.channel.send(nouser).then(message.delete());
        }
        let id;
        var noid = new Discord.MessageEmbed()
            .setTitle("That is not a valid username.")
            .setFooter("Make sure the user is in the group, or check spelling.")
            .setColor('34cfeb')
        try {
            id = await noblox.getIdFromUsername(username);
        } catch {
            return message.channel.send(noid).then(message.delete());
        }
        let rank = Number(args[2]);
        var noid2 = new Discord.MessageEmbed()
            .setTitle("Please insert a rank ID")
            .setFooter("Check the group's settings to see the rank IDs of each rank.")
            .setColor('34cfeb')
        if (!rank) {
            return message.channel.send(noid2).then(message.delete());
        }
        let oldRankId = await noblox.getRankInGroup(groupid, id);
        if (oldRankId == 0) {
            return message.channel.send("This user isn't in the group.");
        }
        if (oldRankId >= maximumRank) {
            return message.channel.send("I can't manage this user.");
        }
        if (rank > maximumRank) {
            return message.channel.send("I can't rank that high.");
        }
        let oldRankName = await noblox.getRankNameInGroup(groupid, id);
        try {
            await noblox.setRank(groupid, id, rank);
        } catch (err) {

            return message.channel.send("There was an error while ranking this user: " + err);
        }
        const successbed = new Discord.MessageEmbed()
            .setColor("34cfeb")
            .setTitle("User Ranked Successfully")
            .addField('__**User:**__', `${username}`, true)
            .addField("__**Last Rank:**__", `${oldRankName}`, true)
            .addField("__**Newer Rank:**__", `${await noblox.getRankNameInGroup(groupid, id)}`, true)
            .setFooter("Ranking System Provided by: Glacon.AIC")
            .setAuthor("SCPF Ranking System", 'https://scp-wiki.wdfiles.com/local--files/aiad-homescreen/glacon_00.png')
            .setTimestamp()
        return message.channel.send(successbed);
    }
}