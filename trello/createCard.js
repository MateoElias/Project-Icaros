const fetch = require('node-fetch')
function createCard(message, key, token, id) {

    fetch(`https://api.trello.com/1/cards?key=${key}&token=${token}&idList=6000bb6055b65014068b3ad2&name=${message}`, {
    method: 'POST'
    }).then(res => {
        res = "Successfully created card"
        return console.log(res)
    }).catch(err => {
        return console.log("An error has occured " + err)
    })

}

exports.createCard = createCard
