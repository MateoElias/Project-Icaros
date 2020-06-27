const roblox = require('noblox.js');
const Discord = require('discord.js');
module.exports = {
    name: "rank",
    description: "Ranks a user in a ROBLOX group",
    category: "Ranking",
    run: (client, message, args) => {
        
        const cookie = process.env.securityKey;
        const username = 'Aiexa_AIC'; 
        const password = '2827262728'; 
        const groupid = 5137119;
        const maximumRank = 80; 
        const command = 'setrank';
        const whitelistedRole = 'The Administrator'
        const whitelistedRole2 = 'O5 Council'
        const whitelistedRole3 = 'Primary Overseer'
        
        async function cookieLogin() {
            try {
                await roblox.cookieLogin(cookie);
            } catch (err) {
                login();
                return console.log('There was an error while logging into the account with the cookie: ' + err + ' Attempting to login with username and password...');
            }
            return console.log('Logged in!');
        }
         
        async function login() {
            try {
                await roblox.login(username, password);
            } catch (err) {
                return console.log('There was an error while loggin in to the account with the username and password: ' + err);
            }
            return console.log('Logged in!');
        }
         
        function isCommand(command, message){
            var command = command.toLowerCase();
            var content = message.content.toLowerCase();
            return content.startsWith(prefix + command);
        }
          
        client.on('message', async message => {
            if(message.author.bot) return;
            const args = message.content.slice(prefix.length).split(' ');
            if(isCommand(command, message)) {
                if(!message.member.roles.cache.some(role =>[whitelistedRole, whitelistedRole2, whitelistedRole3].includes(role.name))) {
                    return message.channel.send("Clearance too low to perform this action.");
                }
                let username = args[1];
                if(!username) {
                    return message.channel.send("Please insert a username.");
                }
                let id;
                try {
                    id = await roblox.getIdFromUsername(username);
                } catch {
                    return message.channel.send("This isn't a valid username.");
                }
                let rank = Number(args[2]);
                if(!rank) {
                    return message.channel.send("Please insert a rank id to set the user to.");
                }
                let oldRankId = await roblox.getRankInGroup(groupid, id);
                if(oldRankId == 0) {
                    return message.channel.send("This user isn't in the group.");
                }
                if(oldRankId >= maximumRank) {
                    return message.channel.send("I can't manage this user.");
                }
                if(rank > maximumRank) {
                    return message.channel.send("I can't rank that high.");
                }
                let oldRankName = await roblox.getRankNameInGroup(groupid, id);
                try {
                    await roblox.setRank(groupid, id, rank);
                } catch (err) {
        
                    return message.channel.send("There was an error while ranking this user: " + err);
                }
        
                const successbed = new Discord.MessageEmbed()
                    .setColor("ffd214")
                    .setTitle("User Ranked Successfully")
                    .addField('__**User:**__', `${username}`, true)
                    .addField("__**Last Rank:**__", `${oldRankName}`, true)
                    .addField("__**Newer Rank:**__", `${await roblox.getRankNameInGroup(groupid, id)}`, true)
                    .setFooter("Ranking System Provided by: Glacon.AIC")
                    .setAuthor("SCPF Ranking System", 'https://scp-wiki.wdfiles.com/local--files/aiad-homescreen/glacon_00.png')
                    .setTimestamp()
                return message.channel.send(successbed);
            }
        });
         
    }
}