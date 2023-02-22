const client = require("..")
const {ActivityType} = require("discord.js")

client.on("ready", () => {
    console.log(`Logged as ${client.user.tag}`.black)

    client.user.setActivity('за тобой',{
        type:ActivityType.Watching
    })

    client.user.setStatus('idle')
})
