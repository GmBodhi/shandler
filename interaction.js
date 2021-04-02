module.exports = class {
    /**
     * 
     * @param {Object} interaction 
     * @param {Object} options 
     */
    constructor(interaction, options){
        
        let {channel, guild, client, member} = options
        this.type = interaction.type
        this.token = interaction.token
        this.member = member
        this.id = interaction.id
        this.client = client
        this.guild = guild
        this.data = interaction.data
        this.channel = channel

    }
    /**
     * 
     * @param {*} res - the MessageEmbed object or string
     */
    reply(res){
        if (res) {
            if (typeof res == 'string') {
            this.client.api.interactions(this.interaction.id, this.interaction.token).callback.post({
                data:{
                    type:4,
                    data:{
                        content: res
                    }
                }
            })
        }else if (typeof res == 'object'){
            this.client.api.interactions(this.interaction.id, this.interaction.token).callback.post({
                data:{
                    type:4,
                    data: createAPIMessage(this.interaction, res, this.client)
                }
            })
        }else {
            throw new Error('INVALID Response type response should be a messageembed object or a string')
        }
    }
    }
    /**
     * 
     * @param {*} content - the MessageEmbed object or string
     */
    edit(content){
        if (!content) throw new Error('content can\'t be empty')
        const {data} = APIMessage.create(this.client.channels.resolve(this.channel.id), content)
        return this.client.api.webhooks(this.client.user.id, this.token).messages('@original').patch({ data })
    }

    delete(){
        this.client.api.webhooks(this.client.user.id, this.token).messages('@original').delete()
    }
}