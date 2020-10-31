const {Collection,Client,Discord} = require('discord.js');
const fs = require('fs');
const client = new Client;
const config = require('./config.json')
const mongoose = require('mongoose');
const token = process.env.TOKEN;
const cookie = process.env.securityKey;
const noblox = require('noblox.js');
var prefix = "A!";
client.commands = new Collection();
client.aliases = new Collection();
client.config = config;
mongoose.connect(process.env.mongodb, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
});
client.categories = fs.readdirSync('./commands/');
['command'].forEach(handler => {
    require(`./handler/${handler}`)(client);
});
    client.on('ready', () => {
        console.log('Alexandra.AIC Is up and running!')
        let botStatus = [
            `${prefix}help`,
            `over ${client.user.cache.size} users!`,
            'the site\'s CCTV'
        ]
    
        setInterval(function () {
            let status = botStatus[Math.floor(Math.random() * botStatus.length)];
            client.user.setActivity(status, {
                type: "WATCHING"
            });
    
        }, 7000)
    })
    
    async function run() {
        await noblox.setCookie(cookie);
      }
      
      run();
    
client.on('message', async message => {
        if (message.author.bot) return;
        if (!message.content.startsWith(prefix)) return;
        if (!message.guild) return;
        if (!message.member) message.member = await message.guild.fetchMember(message);
        const args = message.content.slice(prefix.length).trim().split(/ +/g);
        const cmd = args.shift().toLocaleLowerCase().toLowerCase();
        if (cmd.length == 0) return;
        const command = client.commands.get(cmd)
        if (!command) command = client.commands.get(client.aliases.get(cmd));
        if (command) command.run(client, message, args)
    })

client.login(token)
