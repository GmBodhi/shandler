class FInteraction {
    /**
     * 
     * @param {*} client 
     * @param {{}} res 
     * @param {{channel:object, user:object, guild:object, message:object}} extras 
     */
    constructor(client, res, extras){
        this.id = res.id
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
}