const {prefix}= 'A!'
module.exports=client=>{
    client.on('ready', () => {
        console.log('Alexandra.AIC Is up and running!')
        let botStatus = [
            `${prefix}help`,
            `over ${client.users.cache.size} users!`,
            'the site\'s CCTV'
        ]
    
        setInterval(function () {
            let status = botStatus[Math.floor(Math.random() * botStatus.length)];
            client.user.setActivity(status, {
                type: "WATCHING"
            });
    
        }, 7000)
    }) 
}