const fs = require("fs")
const ascii = require("ascii-table")

module.exports = (client) => {
    let eventsTable = new ascii().setHeading('Events','Load Status')
    let events = fs.readdirSync("./events");//events folder
    for(let file of events){//loop for files inside events folder
        require(`../events/${file}`)//require event file
        eventsTable.addRow(file.split('.js')[0], '✅ Ready') //add a row to show event name & load status
    }

    console.log(eventsTable.toString().green)
}