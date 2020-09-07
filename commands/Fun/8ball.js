// VARIABLES * CONSTANTS
const responses = [
  "lol sure",
  "im an 8ball not a deal with your shit ball",
  "absolutely not",
  "lol, over dr. bright's dead body",
  "aye aye captain",
  "nice cut g",
  "you're objectively wrong m8",
  "okay that's maybe an OK from me",
  "bro absolutely",
  "as long as you don't tell Dr. Bright",
  "Sure thing chief",
  "[REDACTED]"
];

// FUNCTIONS
function getResponse() {return responses[Math.floor(Math.random()*responses.length)];}

// COMMAND DEFINITION
module.exports = {
  name: "8ball",
  descriptions: "magic vodoo stuff idk man",
  run: async(client, message, args) => {
    if (!args[0]) {
      if (message.channel)
        message.channel.send("this time actually ask me something");
      else
        message.reply("this time actually ask me something");
      return;
    }

    let resp = ":8ball: " + getResponse();
    if (message.channel)
      message.channel.send(resp);
    else
      message.reply(resp);
    return;
  }
}
