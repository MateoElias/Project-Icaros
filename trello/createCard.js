const fetch = require('node-fetch')
function createCard(message, key, token, id) {

    fetch(`https://api.trello.com/1/lists?key=${key}&token=${token}&name=${message}&idBoard=${id}`).then(res => {
        res = "Successfully created card"
        return console.log(res)
    }).catch(err => {
        return console.log("An error has occured " + err)
    })

}

exports.createCard = createCard