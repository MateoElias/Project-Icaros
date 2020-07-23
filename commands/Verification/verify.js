const Discord = require('discord.js');
const noblox = require('noblox.js');
const https = require('https');
async function mainGroupHandler(guildMember, robloxUsername, robloxId, client) {
            var config = client.config;

            if (guildMember) {
                // Main roblox group
                //try {
                    guildMember = await guildMember.edit({
                        nick: robloxUsername
                    });
                    var isInMainGroup = await noblox.getRankInGroup(config.robloxGroups.main, robloxId) != 0;
                    if (isInMainGroup) {
                        var rankName = await noblox.getRankNameInGroup(config.robloxGroups.main, robloxId);
                        var guild = guildMember.guild;
                        var role = guild.roles.cache.find(r => r.name == rankName);
                        guildMember = await guildMember.roles.remove(guildMember.roles.cache);
                        guildMember = await guildMember.roles.add(role);

                        // Apply membership roles
                        var isInAD = await noblox.getRankInGroup(config.robloxGroups.AD, robloxId) != 0;
                        var isInSD = await noblox.getRankInGroup(config.robloxGroups.SD, robloxId) != 0;
                        var isInMTF = await noblox.getRankInGroup(config.robloxGroups.MTF, robloxId) != 0;
                        var isInScD = await noblox.getRankInGroup(config.robloxGroups.ScD, robloxId) != 0;
                        var isInEC = await noblox.getRankInGroup(config.robloxGroups.EC, robloxId) != 0;
                        var isInDEA = await noblox.getRankInGroup(config.robloxGroups.DEA, robloxId) != 0;
                        var isInMaD = await noblox.getRankInGroup(config.robloxGroups.MaD, robloxId) != 0;

                        if (isInAD)
                            guildMember.roles.add(guild.roles.cache.find(r => r.name == "AD"));
                        if (isInSD)
                            guildMember.roles.add(guild.roles.cache.find(r => r.name == "SD"));
                        if (isInMTF)
                            guildMember.roles.add(guild.roles.cache.find(r => r.name == "MTF"));
                        if (isInScD)
                            guildMember.roles.add(guild.roles.cache.find(r => r.name == "ScD"));
                        if (isInEC)
                            guildMember.roles.add(guild.roles.cache.find(r => r.name == "EC"));
                        if (isInDEA)
                            guildMember.roles.add(guild.roles.cache.find(r => r.name == "DEA"));
                        if (isInMaD)
                            guildMember.roles.add(guild.roles.cache.find(r => r.name == "MaD"));
                    } else {
                        return;
                    }
                //} catch (err) {}
            } else {
                return;
            }
        }
        async function groupHandler(guildMember, robloxUsername, robloxId, groupId) {
            if (guildMember) {
                guildMember = await guildMember.setNickanme(robloxUsername);
                var isInGroup = await noblox.getRankInGroup(groupId, robloxId) != 0;
                if (isInGroup) {

                    var rankName = await noblox.getRankNameInGroup(groupId, robloxId);
                    var guild = guildMember.guild;
                    var role = guild.roles.cache.find(r => r.name == rankName);
                    await guildMember.roles.remove(guildMember.roles);
                    await guildMember.roles.add(role);
                    return;
                } else {
                    return;
                }
            } else {
                return;
            }
        }
module.exports = {
    name: "verify",
    description: "Verification Command (Experimental)",
    run: async (client, message, args) => {
            const config = client.config;
            const discordId = message.author.id;
            const url = `https://verify.eryn.io/api/user/${discordId}`;

            var data = ``;
            var botMessage = new Discord.MessageEmbed()
                .setColor("#16699f")

            https.get(url, (resp) => {
                resp.on(`data`, (chunk) => {
                    data += chunk;
                });
                resp.on(`end`, () => {
                    data = JSON.parse(data);

                    if (data.status == "ok") {
                        botMessage.setTitle(`Verification Successful!`);
                        botMessage.setDescription(`You are currently verified as **${data.robloxUsername}**. If you wish to reverify your account, click [here](https://verify.eryn.io/) and follow the instructions.`);

                        var robloxId = data.robloxId;
                        var robloxUsername = data.robloxUsername;

                        var mainGuild = client.guilds.cache.find(g => g.id == 660523785845473280);

                        // Gather guild members
                        var mainGuildMember = mainGuild.member(message.author);

                        // Apply roles
                        mainGroupHandler(mainGuildMember, robloxUsername, robloxId, client);
                        //await groupHandler(adGuildMember, robloxUsername, robloxId, config.robloxGroups.AD)

                        if (message.channel)
                            message.channel.send(botMessage);
                        else
                            message.reply(botMessage);

                        console.log(`Verified ${message.author.tag} as ${data.robloxUsername}`);
                        return;
                    } else {
                        if (data.errorCode == "429") {
                            botMessage.setTitle(`Error Code 429`);
                            botMessage.setDescription(`There was an error verifying your account. **Please try again after ${data.retryAfterSeconds} seconds**. If this error persists, please contact @master10104#3395 with the error code.`);

                            if (message.channel)
                                message.channel.send(botMessage);
                            else
                                message.reply(botMessage);
                            console.log(`Error 429. ${data.error}`);
                        } else {
                            if (data.errorCode == "404") {
                                botMessage.setTitle(`Verification Failed!`);
                                botMessage.setDescription(`Your discord account isn't linked to a Roblox account. To verify your account, click [here](https://verify.eryn.io/) and follow the instructions.`);
                                if (message.channel)
                                    message.channel.send(botMessage);
                                else
                                    message.reply(botMessage);
                                console.log(`Account not verified`);
                            } else {
                                botMessage.setTitle(`Error Code ${data.errorCode}`);
                                botMessage.setDescription(`There was an error verifying your account. Please try again later. If this problem persists, please contact @master10104#3395 with the error code.`);
                                if (message.channel)
                                    message.channel.send(botMessage);
                                else
                                    message.reply(botMessage);
                                console.log(`Error ${data.errorCode}. ${data.error}`);
                            }
                        }
                    }
                });
            }).on(`error`, (err) => {
                console.log(err.message);
            });
        }
    }
