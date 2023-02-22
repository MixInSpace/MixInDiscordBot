const {Client, GatewayIntentBits, Partials, Collection} = require('discord.js')
const client = new Client({
    intents:[/*https://discord-api-types.dev/api/discord-api-types-v10/enum/GatewayintentBits*/
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ],
    partials:[/*https://discord.js.org/#/docs/discord.js/14.7.1/typedef/Partials*/
        Partials.Message,
        Partials.User,
        Partials.Channel,
        Partials.GuildMember
    ]
})

const fs = require("fs")
require("dotenv").config()
var colors = require('colors');
colors.enable();

module.exports = client

client.commands = new Collection()
client.aliases = new Collection()
client.prefix = process.env.PREFIX

// load the handlers
fs.readdirSync("./handlers").forEach((handler) => {
    require(`./handlers/${handler}`)(client)
})

client.login(process.env.TOKEN)