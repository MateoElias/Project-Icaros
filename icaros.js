const {Collection, Client, Discord} = require('discord.js');
const fs = require('fs');
const client = new Client;
const mongoose = require('mongoose');
const config = require('./config.json');
const { token } = require('./config.json');
var prefix = "A!";
client.commands = new Collection();
client.aliases = new Collection();
mongoose.connect("mongodb+srv://ProjectIcaros:BdgaP!68YaA9k5t@cluster0-wsyf8.mongodb.net/test",{
    useUnifiedTopology: true,
    useNewUrlParser: true,
});
client.categories = fs.readdirSync('./commands/');
['command'].forEach(handler=>{
    require(`./handler/${handler}`)(client);
});
client.on('ready',()=>{
    let botStatus = [
        "A!help",
        `over ${client.users.cache.size} users!`,
        'the site\'s CCTV'
      ]
    
    setInterval(function() {
        let status = botStatus[Math.floor(Math.random() * botStatus.length)];
        client.user.setActivity(status, {type: "WATCHING"});
    
        }, 7000)
})
client.on('message', async message =>{
    if(message.author.bot) return;
    if(!message.content.startsWith(prefix)) return;
    if(!message.guild) return;
    if(!message.member) message.member = await message.guild.fetchMember(message);
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const cmd = args.shift().toLocaleLowerCase();
    if(cmd.length == 0) return;
    const command = client.commands.get(cmd)
    if(!command) command = client.commands.get(client.aliases.get(cmd));
    if(command) command.run(client,message,args)
})

client.login(token)