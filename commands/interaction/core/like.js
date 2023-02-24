const { SlashCommandBuilder } = require("discord.js")

module.exports = {
    data: new SlashCommandBuilder()
    .setName('like')
    .setDescription("Like the last message"),
    run: async (client, interaction) => {
        const channel = await interaction.channel
        const last_message_id = await channel.lastMessageId
        const last_message = await channel.messages.fetch(last_message_id)
        await last_message.react('👍')
        await interaction.reply({content: "Liked 👍", fetchReply: true})
        await interaction.deleteReply()
    }
}