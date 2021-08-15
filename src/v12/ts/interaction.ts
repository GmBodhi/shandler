import callback from './callback'
import { Channel, Client, Guild, MessageEmbed, APIMessageContentResolvable, APIMessage } from "discord.js"

interface Interaction{
    interaction:Record<any, any>
    options:object
    type:number
    token:string
    member:any
    id:string
    client:any
    guild:any
    data:object
    channel:any
    content:any
}
class Interaction {
    constructor(interaction: { type: number; token: string; id: string; data: object }, options: { channel: any; guild: any; client: any; member: any }){
        
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

     async reply(res:any, options:any){
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
        .then(async (m:any) => await callback(this, m))
    }


    async edit(content:APIMessageContentResolvable | string | MessageEmbed, options:any){
        if (!content) throw new Error('content can\'t be empty')
        const {data} = APIMessage.create(this.channel, content, options)
        let { type = 4 } = options.type;
        // @ts-ignore
        data.type = type;
        return this.client.api.webhooks(this.client.user.id, this.token).messages('@original')
        .patch({ data })
        .then(async (m:any) => await callback(this, m))
    }

    delete(){
        //@ts-ignore
        this.client.api.webhooks(this.client.user.id, this.token).messages('@original').delete()
    }
    
}
export default Interaction