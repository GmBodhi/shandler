const {callback} = require('./callback')
const {APIMessage} = require('discord.js')
class FInteraction {
    /**
     * @param {*} client 
     * @param {{
     *  id:string
     *  type:number
     *  content:string
     *  attachments:object[]
     *  embeds:object[]
     *  mentions:any[]
     *  mention_roles:any[]
     *  pinned:boolean
     *  mention_everyone:boolean
     *  tts:boolean
     *  timestamp:any
     *  edited_timestamp:any
     *  flags:number
     *  webhook_id:string
     *  message_reference: {channel_id: string, guild_id: string, message_id: string}
     * }} res 
     * @param {{
     *  channel:object,
     *  member:object,
     *  guild:object
     * }} extras 
     */
    constructor(client, res, extras){
        this.id = res.id
        this.token = res.token
        this.type = res.type
        this.client = client
        this.content = res.content
        this.channel = extras.channel 
        this.member = extras.member
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
        this.messageRefID = res.message_reference.message_id
    }


    /**
     * 
     * @param {*} res - the MessageEmbed object or string
     * @param {replyOptions} options - Replyoptions object
     */
    async reply(res, options = {}){
        let {type = 4} = options
        if (!res) throw new Error('content cannot be empty.')
        let apiMessage;
        if (res instanceof APIMessage){
            apiMessage = res.resolveData()
        }else{
            apiMessage = APIMessage.create(this.channel, res, options)
        }
        const {data, files} = await apiMessage.resolveFiles();
        data.type = type;
        return this.client.api.webhooks(this.client.user.id, this.token)
        .post({ data, files })
        .then(async m => await callback(this, m))
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
        return this.client.api.webhooks(this.client.user.id, this.token).messages(this.id)
        .patch({ data })
        .then(async m => await callback(this, m))
    }

    delete(){
        this.client.api.webhooks(this.client.user.id, this.token).messages(this.id).delete()
    }
}

module.exports = FInteraction;