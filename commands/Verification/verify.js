const Discord = require('discord.js');
const noblox = require('noblox.js');
const https = require('https');
const groupId = 5137119;
const guildId = 726211885288128581;
module.exports = {
    name: "verify",
    description: "Verification Command (Experimental)",
    run: async (client, message, args) => {
        let data = " "
        https.get("https://verify.eryn.io/api/user/".message.author.id, (resp) => {
            resp.on(`data`, (chunk) => { data += chunk; });
            resp.on(`end`, () => {
                data = JSON.parse(data);
                // some of this is async, you can tell with `await`. just know to make a handler for those parts or make the exported function async
if (data.status == "ok") {
    var robloxId = data.robloxId;
    var robloxUsername = data.robloxUsername; 
    var myGuild = client.guilds.cache.find(g => g.id == guildId);
    var guildMember = myGuild.member(message.author);
    var isInGroup = (await noblox.getRankInGroup(groupId, robloxId)) != 0;
    
    if (isInGroup) {
        guildMember = await guildMember.edit({nick: robloxUsername});
        var rankName = await noblox.getRankNameInGroup(groupId, robloxId);
        var role = myGuild.roles.cache.find(r => r.name == rankName);
        guildMember = await guildMember.roles.remove(guildMember.roles); // you can edit this if you have extra roles you don't want to be removed
        guildMember = await guildMember.roles.add(role);
    } else {
        // do whatever you want if the user isn't in the group
    }
    
} else {
    if (data.errorCode == "429") {
        if (message.channel)
            message.channel.send(`lol try again in ${data.retryAfterSeconds} seconds`);
        else
            message.reply(`lol try again in ${data.retryAfterSeconds} seconds`);
    } else {
        if (message.channel)
            message.channel.send(`You may not be verified! Please reverify at [insert link to rover]`);
        else
            message.reply(`You may not be verified! Please reverify at [insert link to rover]`);
        console.log(`${data.errorCode}: ${data.error}`);
    }
}
            });
        }).on(`error`, (err) => {
            console.log("Error: " + err.message);
        });
    }
}