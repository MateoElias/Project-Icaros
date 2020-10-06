/**
 * verify.js - A Command for verification in Oli's SCPF
 * @author master30304
 * @date September 28th 2020
 */

// Dependencies
const Discord = require(`discord.js`);
const noblox = require(`noblox.js`);
const https = require(`https`);

// Variables
const roverURL = `https://verify.eryn.io/api/user/`;

// Functions

/**
 * Handles verification for the main group
 * @param {Discord.GuildMember} guildMember
 * @param {string} robloxUsername
 * @param {number} robloxId
 * @param {Array} robloxGroups
 * @param {Discord.Client} client
 */
async function mainGroupHandler(guildMember, robloxUsername, robloxId, robloxGroups, client) {
    var config = client.config;

    // try {
    if (guildMember) {
        if(!guildMember.nickname)
            guildMember = await guildMember.edit({ nick: robloxUsername });

        if (await noblox.getRankInGroup(config.robloxGroups.main, robloxId) != 0) {
            // Apply the rank in the main group
            var rankName = await noblox.getRankNameInGroup(config.robloxGroups.main, robloxId);
            var guild = guildMember.guild;
            var role = guild.roles.cache.find(r => r.name == rankName);
            guildMember = await guildMember.roles.remove(guildMember.roles.cache);
            guildMember = await guildMember.roles.add(role);

            // Apply gorup membership roles
            var groupMembership = [];
            for (var i = 0; i < robloxGroups.length; i++)
                groupMembership.push(await noblox.getRankInGroup(robloxGroups[i].id, robloxId) != 0);

            for (var i = 0; i < robloxGroups.length; i++)
                if (groupMembership[i])
                    guildMember.roles.add(guild.roles.cache.find(r => r.name == robloxGroups[i].name));
        }
    }
    // } catch (err) {console.log(err); return;}
}

/**
 * Handles verification for specific groups (AD, EC, etc.)
 * @param {Discord.GuildMember} guildMember
 * @param {string} robloxUsername
 * @param {number} robloxId
 */
async function groupHandler(guildMember, robloxUsername, robloxId, groupId) {
    if (await noblox.getRankInGroup(groupId, robloxId) != 0) {
        if (!guildMember.nickname) 
            guildMember = await guildMember.edit({ nick: robloxUsername });
        var rankName = await noblox.getRankNameInGroup(groupId, robloxId);
        var role = guildMember.guild.roles.cache.find(r => r.name == rankName);
        guildMember = await guildMember.roles.remove(guildMember.roles);
        guildMember = await guildMember.roles.add(role);
    }
}

// Module
module.exports.groupHandler = groupHandler; // Don't worry about this, I only have this here just in case Oli gets pissy about something
module.exports.name = "verify";
module.exports.description = "Verification Command (Experimental)";

/**
 * The execution of the module
 * @param {Discord.Client} client
 * @param {string} message
 * @param {string[]} args
 */
module.run = async (client, message, args) => {
    // Initialize client-dependant constants
    const config = client.config;
    const discordId = message.author.id;
    const url = roverURL + discordId;
    const robloxGroups = [
        { name: "AD", id: config.robloxGroups.AD },
        { name: "SD", id: config.robloxGroups.SD },
        { name: "MTF", id: config.robloxGroups.MTF },
        { name: "ScD", id: config.robloxGroups.ScD },
        //{ name: "EC", id: config.robloxGroups.EC },
        { name: "DEA", id: config.robloxGroups.DEA },
        { name: "MaD", id: config.robloxGroups.MaD },
        { name: "RAISA", id: config.robloxGroups.RAISA }
    ];
    const discordGuilds = [
        client.guilds.cache.find(g => g.id == config.discordGuilds.AD),
        client.guilds.cache.find(g => g.id == config.discordGuilds.SD),
        client.guilds.cache.find(g => g.id == config.discordGuilds.MTF),
        client.guilds.cache.find(g => g.id == config.discordGuilds.ScD),
        //client.guilds.cache.find(g => g.id == config.discordGuilds.EC),
        client.guilds.cache.find(g => g.id == config.discordGuilds.DEA),
        client.guilds.cache.find(g => g.id == config.discordGuilds.MaD),
        client.guilds.cache.find(g => g.id == config.discordGuilds.RAISA),
    ];

    // Begin verification process
    var data = ``;
    var botMessage = new Discord.MessageEmbed();

    // Send request to RoVer for Verification Data
    https.get(url, (resp) => {
        resp.on(`data`, (chunk) => { data += chunk; });
        resp.on(`end`, async () => {
            data = JSON.parse(data);

            if (data.status == "ok") { // If the request was successfully made
                botMessage.setTitle(`Verification Successful!`);
                botMessage.setDescription(`You are currently verified as **${data.robloxUsername}**. If you wish to reverify your account, click [here](https://verify.eryn.io/) and follow the instructions.`);
                botMessage.setColor('4cb913');

                var robloxUsername = data.robloxUsername;
                var robloxId = data.robloxId;

                // Main Guild Verification
                var mainGuild = client.guilds.cache.find(g => g.id == config.discordGuilds.main);
                var mainGuildMember = mainGuild.member(message.author);
                await mainGroupHandler(mainGuildMember, robloxUsername, robloxId, robloxGroups, client);

                // Other Group Verification
                var guildMember;
                for (var i = 0; i < discordGuilds.length; i++) {
                    guildMember = discordGuilds[i].member(message.author);
                    if (guildMember)
                        await groupHandler(guildMember, robloxUsername, robloxUsername, robloxGroups[i].id);
                }
            } else {
                switch (data.errorCode) {
                    case "404": 
                        botMessage.setTitle(`Error Code 404!`);
                        botMessage.setDescription(`Your discord account isn't linked to a Roblox account. To verify your account, click [here](https://verify.eryn.io/) and follow the instructions.`);
                        botMessage.setColor('c70808');
                        break;
                    case "429":
                        botMessage.setTitle(`Error Code 429`);
                        botMessage.setDescription(`There was an error verifying your account (Too many requests). **Please try again after ${data.retryAfterSeconds} seconds**. If this error persists, please contact @master10104#3395 with the error code.`);
                        botMessage.setColor('c70808');
                        break;
                    default:
                        botMessage.setTitle(`Error Code ${data.errorCode}`);
                        botMessage.setDescription(`There was an error verifying your account. Please try again later. If thise error persists, please contact @master10104#3395 with the error message below.`);
                        botMessage.setColor('c70808');
                        botMessage.addField("**__Error Message__**", data.error);
                        break;
                }
            }
        });
    }).on(`error`, (err) => {
        console.log(err.message);
    });

    if (message.channel)
        message.channel.send(botMessage);
    else
        message.reply(botMessage);
    return;
};
