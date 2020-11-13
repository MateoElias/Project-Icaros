// VARIABLES * CONSTANTS
const fetch = require('node-fetch');
// COMMAND DEFINITION
module.exports = {
  name: "8ball",
  descriptions: "magic vodoo stuff idk man",
  run: async(client, message, args) => {
    var response = await fetch('https://no-api-key.com/api/v1/magic8ball')
    response = await response.json()
    
    
    if (!args[0]) {
      if (message.channel)
        message.channel.send("this time actually ask me something");
      else
        message.reply("this time actually ask me something");
      return;
    }

    let resp = ":8ball: " + response.response
    if (message.channel)
      message.channel.send(resp);
    else
      message.reply(resp);
    return;
  }
}
