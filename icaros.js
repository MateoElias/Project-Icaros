const {Collection,Client,Discord} = require('discord.js');
const fs = require('fs');
const client = new Client;
const mongoose = require('mongoose');
const token = process.env.TOKEN;
var prefix = "A!";
client.commands = new Collection();
client.aliases = new Collection();
mongoose.connect(process.env.mongodb, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
});
client.categories = fs.readdirSync('./commands/');
['command', 'event'].forEach(handler => {
    require(`./handler/${handler}`)(client);
});

client.login(token)