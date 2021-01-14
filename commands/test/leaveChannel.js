const { MessageEmbed } = require('discord.js')
const { createCard } = require('../../trello/createCard.js')
module.exports = {
  name: "authorize",
  description: "test",
  category: "test",
  run: async (bot, message, args) => {
    const config = require('../../config.json')

    let content = args.slice(1).join(" ")

    createCard(content, config.trelloInfo.KEY, config.trelloInfo.trelloToken, config.trelloInfo.ID)

  }
};