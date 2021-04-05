const { APIMessage } = require('discord.js');
const {createAPIMessage} = require('./api')

const Callback = async (res, data) =>{
    if (!data || !res) return;
    if (!res.token) throw new Error('Token missing');
    data.token = res.token       
    let guild = res.guild
    let member = res.member
    let channel = res.channel
    let extras = {
        member,
        channel,
        guild
    }
    let interaction = new FInteraction(res.client, data, extras)
    return interaction;
}


class FInteraction {
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
        this.messageRefID = res.message_reference?.message_id ? res.message_reference?.message_id : "@original"
    }

    async reply(res, options = {}){
        let {type = 4} = options, data;
        if (!res) throw new Error('content cannot be empty.')
        console.log(typeof(content))

        data = {
                content:res || "",
                embeds:options.embeds || [options.embed]
            }

        return this.client.api.webhooks(this.client.user.id, this.token)
        .post({ data:{
                type: type || 4,
                content: data.content || "",
                embeds: data.embeds || null,
                tts: options.tts || false
        } })
        .then(async (m) => await Callback(this, m))
    }

    async edit(content, options = {}){
        if (!content) throw new Error('content can\'t be empty')
        let { type = 4 } = options,data;
        if (typeof content == 'string'){
            data = {
                content:content
            }
        }else{
            data = {
                embeds:options.embeds || [options.embed]
            }
        }
        data.type = type || 4
        return this.client.api.webhooks(this.client.user.id, this.token).messages(this.messageRefID)
        .patch({ data:{
            type: type||4,
            content: data.content || "",
            embeds: data.embeds || [],
            tts: options.tts || false
         } })
        .then(async (m) => await Callback(this, m).catch(console.error)).catch(console.error)
    }

    async delete(){
        // @ts-ignore
        return await this.client.api.webhooks(this.client.user.id, this.token).messages(this.messageRefID).delete().catch(console.error)
    }
}

module.exports = FInteraction