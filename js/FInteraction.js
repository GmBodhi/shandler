class FInteraction {
    /**
     * 
     * @param {*} client 
     * @param {{}} res 
     * @param {{channel:object, user:object, guild:object, message:object, interaction:object}} extras 
     */
    constructor(client, res, extras){
        this.id = res.id
        this.interaction = extras.interaction
        this.type = res.type
        this.client = client
        this.content = res.content
        this.channel = extras.channel
        this.author = extras.user
        this.attachments = res.attachments
        this.embeds = res.embeds
        this.mentions = res.mentions
        this.mentionRoles = res.mention_roles
        this.guild = extras.guild
        this.pinned = res.pinned
        this.mentionEveryone = res.mention_everyone
        this.tts = res.tts
        this.timestamp = res.timestamp
        this.editedTimestamp = res.edited_timestamp
        this.flags = res.flags
        this.webhookID = res.webhook_id
        this.message = extras.message        
    }
     /**
     * 
     * @param {*} res - the MessageEmbed object or string
     */
      send(res){
        if (res) {
            if (typeof res == 'string') {
            this.client.api.webhooks(this.client.user.id, this.interaction.token).post({
                data:{
                    type:3,
                    data:{
                        content: res
                    }
                }
            })
        }else if (typeof res == 'object'){
            this.client.api.webhooks(this.client.user.id, this.interaction.token).post({
                data:{
                    type:3,
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
     * @param {*} res - the MessageEmbed object or string
     */
    reply(res){
        if (res) {
            if (typeof res == 'string') {
            this.client.api.webhooks(this.client.user.id, this.interaction.token).post({
                data:{
                    type:4,
                    data:{
                        content: res
                    }
                }
            })
        }else if (typeof res == 'object'){
            this.client.api.webhooks(this.client.user.id, this.interaction.token).post({
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
        return this.client.api.webhooks(this.client.user.id, this.token).messages(this.message.id).patch({ data })
    }

    delete(){
        this.client.api.webhooks(this.client.user.id, this.token).messages(this.message.id).delete()
    }
}