const config = require('./config.json')
const fetch = require('node-fetch')

fetch(`https://api.trello.com/1/boards/6000bb3fcb4638858d9b18b9?key=${config.trelloInfo.KEY}&token=${config.trelloInfo.trelloToken}`).then(res => res.json()).then(data => console.log(data))