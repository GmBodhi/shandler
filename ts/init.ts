import createAPIMessage from './api'
import Interaction from './interaction'
import { APIMessage, Client } from 'discord.js'

const init = async (interaction: Record<any, any>, client: Client): Promise<any> => {
    const member = await client.guilds.fetch(interaction.guild_id).then(g => g.members.fetch(interaction.member.user.id))
    const guild = await client.guilds.fetch(interaction.guild_id)
    const channel = await client.channels.fetch(interaction.channel_id)
    const options = {
        guild,
        channel,
        member
    }
    interaction = new Interaction(interaction, options)
    try {

        client.commands.get(interaction.data.name)?.run({interaction, user: {}, client, guild, args: [], channel})
    } catch (e) {
        throw new Error(e)
    }
}

export default init