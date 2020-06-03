const {Collection, Client, Discord} = require('discord.js');
const fs = require('fs');
const client = new Client;

//RoVer's Public API Fetch


const config = require('./config.json');
const { token } = require('./config.json');
var prefix = "A!";
client.commands = new Collection();
client.aliases = new Collection();
client.categories = fs.readdirSync('./commands/');
['command'].forEach(handler=>{
    require(`./handler/${handler}`)(client);
});
client.on('ready',()=>{
    client.user.setActivity(`with the site's CCTV | ${prefix}help`);
    console.log("Alexandra.AIC is up and running")
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