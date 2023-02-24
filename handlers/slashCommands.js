const fs = require("fs")
const ascii = require("ascii-table")
const { REST } = require("discord.js")
const { Routes } = require("discord-api-types/v10")

const token = process.env.TOKEN
const applicationID = process.env.APPLICATION_ID || null
const clientID = process.env.CLIENT_ID || null
const guildID = process.env.GUILD_ID || null //If you want to register commands globaly dont add guild_id

module.exports = async (client) => {
    let table = new ascii().setHeading('Slash Commands','Load Status')

    const slashCommands = []

    fs.readdirSync('./commands/interaction/').forEach(dir => {
        const files = fs.readdirSync(`./commands/interaction/${dir}/`).filter(file => file.endsWith('.js'))

        for(let file of files){
            let slashCommand = require(`../commands/interaction/${dir}/${file}`)

            if(slashCommand.data){
                slashCommands.push(slashCommand.data)

                client.slashCommands.set(slashCommand.data.name, slashCommand)
                table.addRow(slashCommand.data.name, '✅ Succses')
            } else {
                table.addRow(file.split('.js')[0], '⛔ Failed') 
                continue
            }
        }
    })

    console.log(table.toString().cyan)

    const rest = new REST({version:'10'}).setToken(token)
    try{
        await rest.put(
            guildID ? 
            Routes.applicationGuildCommands(applicationID || clientID, guildID) :
            Routes.applicationCommands(applicationID || clientID),
            {body: slashCommands}
        )
        console.log("✅ Registred Slash Commands".yellow)
    } catch(error) {
        console.log(error)
    }
}