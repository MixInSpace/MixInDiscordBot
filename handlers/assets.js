const fs = require("fs")
const ascii = require("ascii-table")


module.exports = async (client) => {
    let table = new ascii().setHeading('Assets','Load Status')
    fs.readdirSync("./assets/").forEach(dir => {
        const assets = fs.readdirSync(`./assets/${dir}/`)

        for(let file of assets){//loop for files inside assets folder
            let asset = fs.readFileSync(`./assets/${dir}/${file}`).toString().split('\n\n')
            client.assets.set(file.split('.')[0], asset) //add asset to Collection
            table.addRow(file.split('.')[0], '✅ Succses') //add a row to show asset name & load status
        }
    })
    console.log(table.toString().red)
}