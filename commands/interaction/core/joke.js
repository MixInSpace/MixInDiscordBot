const { SlashCommandBuilder, SlashCommandStringOption } = require("discord.js")
const fs = require("fs")
const client = require("../../../")

const joke = client.assets.get("anek")

module.exports = {
    data: new SlashCommandBuilder()
    .setName('joke')
    .setDescription("Tell a joke"),
    run: async (client, interaction) => {
        interaction.reply({content:joke[Math.floor(Math.random() * 124160)].replace("<|startoftext|>", '').replace(/((?:\.\-|!\-|\?\-|\,\-|\:\-))+/g, '\n-')})
    }
}