import callback from './callback';
import {APIMessage} from 'discord.js';
import { MessageTarget } from 'discord.js';

interface FInteraction {
    client:any
    res:any
    extras:Record<any, any>
    id:string
    token:string
    type:number
    content:string
    channel:MessageTarget
    member:object
    attachments:any
    embeds:any[]
    mentions:any
    mentionRoles:any
    guild:object
    pinned:boolean
    mentionEveryone:boolean
    tts:boolean
    timestamp:any
    editedTimestamp:any
    flags:number
    webhookID:string
    messageRefID:any
    data:any

}
class FInteraction {
    constructor(client:any, res:any, extras:Record<any, any>){
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

    async reply(res:any, options:any){
        let {type = 4} = options
        if (!res) throw new Error('content cannot be empty.')
        let apiMessage;
        if (res instanceof APIMessage){
            apiMessage = res.resolveData()
        }else{
            apiMessage = APIMessage.create(this.channel, res, options)
        }
        const {data, files} = await apiMessage.resolveFiles();
        // @ts-ignore
        data.type = type;
        return this.client.api.webhooks(this.client.user.id, this.token)
        .post({ data, files })
        .then(async (m:any) => await callback(this, m))
    }

    async edit(content:string, options:any){
        if (!content) throw new Error('content can\'t be empty')
        const {data} = APIMessage.create(this.channel, content, options)
        let { type = 4 } = options.type;
        // @ts-ignore
        data.type = type;
        return this.client.api.webhooks(this.client.user.id, this.token).messages(this.id)
        .patch({ data })
        .then(async (m:any) => await callback(this, m))
    }

    delete(){
        // @ts-ignore
        this.client.api.webhooks(this.client.user.id, this.token).messages(this.id).delete()
    }
}

export default FInteraction