module.exports = {
    name:'like',
    description:"Like the replyed message",
    run:async(client, message, args)=>{
        if(!message.reference){
            const repliedTo = await message.fetchReference()
        repliedTo.react('👍')
            .then(await message.delete())
            .catch(console.error);
        }
    }
}