import createAPIMessage from './api'
import Interaction from './interaction'
import {APIMessage} from 'discord.js'

export default async (interaction:any, client:any) => {
    const member = await client.guilds.fetch(interaction.guild_id).then((g:any) => g.members.fetch(interaction.member.user.id))
    const guild = await client.guilds.fetch(interaction.guild_id)
    const channel = await client.channels.fetch(interaction.channel_id)
    const Options = {
        guild,
        channel,
        member,
        client
    }
    interaction = new Interaction(interaction, Options)
    const { options } = interaction.data
    try{
        client.commands.get(interaction.data.name).run({interaction, member, client, guild, options, channel})
    } catch (e){
        throw new Error(e)
    }
}