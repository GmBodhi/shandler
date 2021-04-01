const {createAPIMessage} = require('./api')
module.exports = (interaction, client) => {
    const user = await client.users.fetch(interaction.member.user.id)
    const guild = await client.guilds.fetch(interaction.guild_id)
    const args = interaction.data.options
    const channel = await client.channels.fetch(interaction.channel_id)
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
    client.commands.get(interaction.data.name).run({interaction, user, client, guild, args, channel})
    } catch (e){
        throw new Error(e)
    }
}