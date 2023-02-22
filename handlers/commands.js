const fs = require("fs")
const ascii = require("ascii-table")

module.exports = (client) => {
    let table = new ascii().setHeading('Commands','Load Status')
    fs.readdirSync("./commands/prefix").forEach(dir => {
        const commands = fs.readdirSync(`./commands/prefix/${dir}/`).filter(file => file.endsWith('.js'))//filter all js files

        for(let file of commands){//loop for files inside commands folder
            let command = require(`../commands/prefix/${dir}/${file}`)//require command file
            if (command.name){ //if file exports name
                client.commands.set(command.name, command) //add command to Collection
                table.addRow(command.name, '✅ Succses') //add a row to show event name & load status
            } else { // if no command name
                table.addRow(file.split('.js')[0], '⛔ Failed') 
                continue
            }

            if(command.aliases && Array.isArray(command.aliases)){// if aliases are exported as array
                command.aliases.forEach(alias =>{
                    client.aliases.set(alias, command.name)//add the alias to collection
                })
            }
        }
    })

    console.log(table.toString().blue)
}