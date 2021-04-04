import callback from './callback'
const { APIMessage } = require("discord.js")


class Interaction {
    constructor(interaction, options){
        
        let { channel, guild, client, member } = options
        this.type = interaction.type
        this.token = interaction.token
        this.member = member
        this.id = interaction.id
        this.client = client
        this.guild = guild
        this.data = interaction.data
        this.channel = channel

    }

     async reply(res, options){
        let {type = 4} = options
        if (!res) throw new Error('Cannot send an empty message.')
        let apiMessage;
        if (res instanceof APIMessage){
            apiMessage = res.resolveData()
        }else{
            apiMessage = APIMessage.create(this.channel, res, options)
        }
        const {data, files} = await apiMessage.resolveFiles();
        // @ts-ignore
        data.type = type;
        return this.client.api.webhooks(this.interaction.id, this.interaction.token).callback
        .post({ data, files })
        .then(async (m) => await callback(this, m))
    }


    async edit(content, options){
        if (!content) throw new Error('content can\'t be empty')
        const {data} = APIMessage.create(this.channel, content, options)
        let { type = 4 } = options.type;
        // @ts-ignore
        data.type = type;
        return this.client.api.webhooks(this.client.user.id, this.token).messages('@original')
        .patch({ data })
        .then(async (m) => await callback(this, m))
    }

    delete(){
        //@ts-ignore
        this.client.api.webhooks(this.client.user.id, this.token).messages('@original').delete()
    }
    
}
module.exports = Interaction