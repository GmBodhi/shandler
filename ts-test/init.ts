const {createAPIMessage} = require('./api')
const {Interaction} = require('./interaction')
const {APIMessage} = require('discord.js')
/**
 * 
 * @param {Object} interaction - Interaction object from the discord api
 * @param {Object} client - Discord.js client object
 */
module.exports = async (interaction, client) => {
    const member = await client.guilds.fetch(interaction.guild_id).then(g => g.members.fetch(interaction.member.user.id))
    const guild = await client.guilds.fetch(interaction.guild_id)
    const channel = await client.channels.fetch(interaction.channel_id)
    const Options = {
        guild,
        channel,
        member
    }
    interaction = new Interaction(interaction, Options)
    const { options } = interaction.data
    try{
        client.commands.get(interaction.data.name).run({interaction, member, client, guild, options, channel})
    } catch (e){
        throw new Error(e)
    }
}