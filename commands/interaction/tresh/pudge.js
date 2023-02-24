const { SlashCommandBuilder, SlashCommandStringOption } = require("discord.js")
const fs = require("fs")
const client = require("../../../")


module.exports = {
    data: new SlashCommandBuilder()
    .setName('pudge')
    .setDescription("Surprize"),
    run: async (client, interaction) => {
        interaction.reply({content:'https://www.youtube.com/watch?v=3nJs6GPmEZs'})
    }
}