const {callback} = require('./callback')
module.exports = class {
    /**
     * 
     * @param {Object} interaction 
     * @param {Object} options 
     */
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
    /**
     * 
     * @param {*} res - the MessageEmbed object or string
     */
     async reply(res, options = {}){
        let {type = 4} = options
        if (!res) throw new Error('Cannot send an empty message.')
        let apiMessage;
        if (res instanceof APIMessage){
            apiMessage = res.resolveData()
        }else{
            apiMessage = APIMessage.create(this.channel, res, options)
        }
        const {data, files} = await apiMessage.resolveFiles();
        data.type = type;
        return this.client.api.webhooks(this.interaction.id, this.interaction.token).callback
        .post({ data, files })
        .then(m => callback(this, m))
    }
    /**
     * 
     * @param {*} content - the MessageEmbed object or string
     */
    edit(content, options = {}){
        if (!content) throw new Error('content can\'t be empty')
        const {data} = APIMessage.create(this.channel, content, options)
        let { type = 4 } = options.type;
        data.type = type;
        return this.client.api.webhooks(this.client.user.id, this.token).messages('@original')
        .patch({ data })
        .then(m => callback(this, m))
    }

    delete(){
        this.client.api.webhooks(this.client.user.id, this.token).messages('@original').delete()
    }
    
}