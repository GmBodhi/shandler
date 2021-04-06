const { APIMessage, Client } = require('discord.js');
const {createAPIMessage} = require('./api')

/**
 * An object 
 * @typedef {Object} Options
 * @property {number} type - InteractionResponseType - {@link https://discord.com/developers/docs/interactions/slash-commands#interaction-response-interactionresponsetype| InteractionResponseType}
 * @property {Object} embed - MessageEmbed object or JSON embed object
 * @property {Boolean} tts - Text To Speech
 * @property {Array} embeds - Array of embeds
 */

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
    /**
     * Class for followup messages or managing interaction responses
     * @param {Client} client - Discord.js Client object
     * @param {Object} res - data received from api
     * @param {Object} extras - Extra objects for extended capabilities
     * @class
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
        this.messageRefID = res.message_reference?.message_id ? res.message_reference?.message_id : "@original"
    }
    
    /**
     * Sends a follow-up message
     * @param {String} res - The message string
     * @param {Options} options - Options that should be passed to the api
     * @returns {Object}  FInteraction object
     */
    async reply(res, options = {}){
        let {
            type = 4,
            embed = null,
            embeds = [],
            tts = false
        } = options
        if (!res && !options.embed && !options.embeds) throw new Error('content cannot be empty.')
        console.log(typeof(content))

        let data = {
                content: res || "",
                embeds: embeds || [embed]
            }

        return this.client.api.webhooks(this.client.user.id, this.token)
        .post({ data:{
                type: type,
                content: data.content,
                embeds: data.embeds,
                tts: tts 
        } })
        .then(async (m) => await Callback(this, m))
    }

    /**
     * Edits an interaction response or follow-up message
     * @param {String} content - The message string
     * @param {Options} options - Options that should be passed to the api
     * @returns {Object} - FInteraction object
     */
    async edit(content, options = {}){
        if (!content && !options.embed && !options.embeds) throw new Error('content can\'t be empty')
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
    /**
     * Deletes an interaction response or follow-up message
     * @returns {Object}
     */
    async delete(){
        // @ts-ignore
        return await this.client.api.webhooks(this.client.user.id, this.token).messages(this.messageRefID).delete().catch(console.error)
    }
}

module.exports = FInteraction
