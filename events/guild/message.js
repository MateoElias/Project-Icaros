const Timeout = new Set();
const {
    prefix
} = 'A!';
const ms = require('ms');
module.exports = async (client, message) => {
    client.on('message', async message => {
        if (message.author.bot) return;
        if (!message.content.startsWith(prefix)) return;
        if (!message.guild) return;
        if (!message.member) message.member = await message.guild.fetchMember(message);
        const args = message.content.slice(prefix.length).trim().split(/ +/g);
        const cmd = args.shift().toLocaleLowerCase();
        if (cmd.length == 0) return;
        const command = client.commands.get(cmd)
        if (!command) command = client.commands.get(client.aliases.get(cmd));
        if (command) command.run(client, message, args)
    })

}