const fetch = require('node-fetch')

module.exports = {
  name: "8ball",
  descriptions: "magic vodoo stuff idk man",
  run: async(client, message, args) => {
    const msg = message.content.split(" ").slice(1).join(" ")
    
    if(!msg) return message.reply("This time actually ask me something")
    
    fetch(`https://8ball.delegator.com/magic/JSON/${msg}`)
    .then(res => res.json())
    .then(data => { message.channel.send(`🎱 ${data.magic.answer}`) })
    .catch(error => message.reply("Ayo, I'm having a hard time figuring out an answer for that question, try again later"))
  }
}
