const {createAPIMessage} = require('./api')
const Interaction = require('./interaction')
const {APIMessage} = require('discord.js')
/**
 * 
 * @param {Object} interaction - Interaction object from the discord api
 * @param {Object} client - Discord.js client object
 */
module.exports = (interaction, client) => {
    const member = await client.guilds.fetch(interaction.guild_id).then(g => g.members.fetch(interaction.member.user.id))
    const guild = await client.guilds.fetch(interaction.guild_id)
    const channel = await client.channels.fetch(interaction.channel_id)
    const options = {
        guild,
        channel,
        member
    }
    interaction = new Interaction(interaction, options)
    try{
        interaction.reply = async (res) => {
            if (res) {
                if (typeof res == 'string') {
                client.api.interactions(interaction.id, interaction.token).callback.post({
                    data:{
                        type:4,
                        data:{
                            content: res
                        }
                    }
                })
            }else if (typeof res == 'object'){
                client.api.interactions(interaction.id, interaction.token).callback.post({
                    data:{
                        type:4,
                        data: createAPIMessage(interaction, res, client)
                    }
                })
            }else {
                throw new Error('INVALID Response type')
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