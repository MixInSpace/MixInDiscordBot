const { EmbedBuilder } = require("discord.js")
const client = require("..")

client.on("interactionCreate", async interaction =>{
    if(!interaction.isChatInputCommand) return // if it is not a slashCommand
    const slashCommand = client.slashCommands.get(interaction.commandName) // find slash command

    if(!slashCommand) return client.slashCommands.delete(interaction.commandName)

    try{
        await slashCommand.run(client, interaction)
    } catch(error) {
        const errorEmbed = new EmbedBuilder()
        .setTitle("Error! Try again later!")
        .setColor("Red")
        .setDescription(`\`\`\`fix\n${error.message}\`\`\``)
        .setTimestamp()
        await interaction.reply({embeds:[errorEmbed], ephemeral: true})

        console.log(error)
    }
})
