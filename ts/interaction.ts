import { Channel, Client, Guild, MessageEmbed, APIMessageContentResolvable, APIMessage } from "discord.js"
import createAPIMessage from "./api"

interface interaction {
    interaction: Record<any, any>
    options: any
    type: any
    token: string
    member: any
    id: string
    client: any
    channel: any
    guild: any
    data: any
}

class interaction {

    constructor(interaction: Record<any, any>, options: Record<any, any>){
        
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
    reply(res: any){
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
                    // @ts-ignore
                    data: createAPIMessage(this.interaction, res, this.client)
                }
            })
        }else {
            throw new Error('INVALID Response type response should be a messageembed object or a string')
        }
    }
    }
    
    edit(content: MessageEmbed | string | APIMessageContentResolvable | any){
        if (!content) throw new Error('content can\'t be empty')
        const {data} = APIMessage.create(this.client.channels.resolve(this.channel.id), content)
        return this.client.api.webhooks(this.client.user.id, this.token).messages('@original').patch({ data })
    }

    delete(){
        // @ts-ignore
        this.client.api.webhooks(this.client.user.id, this.token).messages('@original').delete()
    }
    
}

export default interaction