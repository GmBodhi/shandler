const callback = require('./callback')
const { APIMessage } = require("discord.js")
const {createAPIMessage} = require('./api')


class Interaction {
    constructor(interaction, options){
        
        let { channel, guild, client, member } = options
        this.type = interaction.type
        this.uid = 1
        this.token = interaction.token
        this.member = member
        this.id = interaction.id
        this.client = client
        this.guild = guild
        this.data = interaction.data
        this.channel = channel

    }

     async reply(res, options = {}){
        let { type } = options
        if (!res) throw new Error('Cannot send an empty message.')
        if (typeof res == 'string'){ data = {
            content:res
        }}else{
            data = await createAPIMessage()
        }
        return this.client.api.interactions(this.id, this.token).callback
        .post({ data:{
            type: (options?.type ? options?.type : 4),
            data:data
        }, files })
        .then(async (m) => await callback(this, m))
    }
    
}
module.exports = Interaction