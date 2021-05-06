const fetch = require('node-fetch')

// COMMAND DEFINITION
module.exports = {
  name: "8ball",
  descriptions: "magic vodoo stuff idk man",
  run: async(client, message, args) => {
    const msg = message.content.split(" ").slice(0).join(" ")
    
    if(!msg) return message.reply("This time actually ask me something")
    
    console.log(msg)
    
  }
}
