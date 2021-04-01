const {createAPIMessage} = require('./api')
const {APIMessage} = require('discord.js')
module.exports = (interaction, client) => {
    const user = await client.users.fetch(interaction.member.user.id)
    const guild = await client.guilds.fetch(interaction.guild_id)
    const args = interaction.data.options
    const channel = await client.channels.fetch(interaction.channel_id)
    interaction.client = client
    try{
        interaction.reply = async (res) => {
            if (res) {
                if (res.length) {
                client.api.interactions(interaction.id, interaction.token).callback.post({
                    data:{
                        type:4,
                        data:{
                            content: res
                        }
                    }
                })
            }else{
                client.api.interactions(interaction.id, interaction.token).callback.post({
                    data:{
                        type:4,
                        data: createAPIMessage(interaction, res, client)
                    }
                })
            }
        }
    }
    interaction.delete = async (inter) =>{
        await inter.client.api.channels(inter.channel_id).messages(inter.id).delete();
    }
    interaction.edit = async (inter, content) => {
        const {data} = APIMessage.create(inter.client.channels.resolve(inter.channel_id), content)
        return inter.client.api.channels[inter.channel_id].messages[inter.id].patch({ data })
    }
    client.commands.get(interaction.data.name).run({interaction, user, client, guild, args, channel})
    } catch (e){
        throw new Error(e)
    }
}