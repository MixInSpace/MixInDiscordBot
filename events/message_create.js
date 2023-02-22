const client = require("..")
const {ChannelType} = require("discord.js")
const prefix = client.prefix

client.on("messageCreate", async(message) =>{
    if(message.author.bot) return // if the author is bot
    if(message.channel.type != ChannelType.GuildText) return // if it is not a text message in the guild
    if(!message.content.startsWith(prefix)) return //check if it starts with prefix
    // if(!message.mentions.has(client.user)) return

    const args = message.content.slice(prefix.length).trim().split(/ +/g)
    const cmd = args.shift().toLowerCase()

    if(cmd.length == 0) return // if the command is empty

    let command = client.commands.get(cmd) // get command object
    if(!command) command = client.commands.get(client.aliases.get(cmd)) //if cant find command

    if(command){
        try{
            command.run(client, message, args)
        } catch (error){
            console.log(error)
        }
    }
})
