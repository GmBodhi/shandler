const { Client } = require('discord.js');

/**
 * An object 
 * @typedef {Object} Options
 * @property {number} type - InteractionResponseType - {@link https://discord.com/developers/docs/interactions/slash-commands#interaction-response-interactionresponsetype| InteractionResponseType}
 * @property {Object} embed - MessageEmbed object or JSON embed object
 * @property {Boolean} tts - Text To Speech
 * @property {Array} embeds - Array of embeds
 * @property {number} flags - flag of the response (setting this to 64 will make it ephemeral)
 */

const Callback = async (res, data) =>{
    if (!data || !res) return;
    if (!res.token) throw new Error('Token missing');
    data.token = res.token
    let guild = res.guild ?? null;
    let member = res.member ?? null
    let channel = res.channel
    let extras = {
        member,
        channel,
        guild,
        user: res.user ?? null
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
        const { message_reference = {} } = res;
        this.id = res.id
        this.token = res.token
        this.type = res.type
        this.client = client
        this.content = res.content
        this.channel = extras.channel 
        this.member = extras.member
        this.user = extras.user
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
        this.messageRefID = message_reference.message_id ?? "@original"
    }
    
    /**
     * Sends a follow-up message
     * @param {String} res - The message string
     * @param {Options} options - Options that should be passed to the api
     * @returns {Object}  FInteraction object
     * @example 
     * interaction.reply('Bello').then(console.log)
     * @example
     * let embed = new MessageEmbed()
     *      .setTitle("This is an embed title")
     *      .setDescription("Bello, this is a description")
     *      .setColor("RANDOM")
     * interaction.reply("Let me send my first embed").then(m => {
     *      m.reply("",{embed:embed})
     * })
     */
    async reply(res, options = {}){
        let {
            type = 4,
            embed,
            embeds = [],
            tts = false,
            flags = null,
            components = []
        } = options
        if (!res && !embed && !embeds) throw new Error('content cannot be empty.')

        if (embed) embeds.push(embed)
        return this.client.api.webhooks(this.client.user.id, this.token)
        .post({ data:{
                type: type,
                content: res,
                embeds: embeds,
                tts: tts,
                flags: flags,
                components: components
        } })
        .then(async (m) => await Callback(this, m))
    }

    /**
     * Edits an interaction response or follow-up message
     * @param {String} content - The message string
     * @param {Options} options - Options that should be passed to the api
     * @returns {Object} - FInteraction object
     * @example
     * interaction.reply("Bello").then(m => {
     *      m.edit("Pog")
     * })
     */
    async edit(content = "", options = {}){
        if (!content && !options.embed && !options.embeds) throw new Error('content can\'t be empty')
        let {
            type = 4,
            embed,
            embeds = [],
            tts = false,
            flags
        } = options;

        if (embed) embeds.push(embed)
        return this.client.api.webhooks(this.client.user.id, this.token).messages(this.messageRefID)
        .patch({ data:{
            type: type,
            content: content,
            embeds: embeds,
            tts: tts,
            flags: flags
         } })
        .then(async (m) => await Callback(this, m).catch(console.error)).catch(console.error)
    }
    
    get message(){
        return (this.id ? this.channel?.messages.resolve(this.id) : null) ?? null;
    }
    /**
     * Deletes an interaction response or follow-up message
     * @returns {Object}
     * @example
     * interaction.reply("Bello").then(m =>{
     *      m.delete("Bello")
     * })
     */
    async delete(){
        // @ts-ignore
        return await this.client.api.webhooks(this.client.user.id, this.token).messages(this.messageRefID).delete().catch(console.error)
    }
}

module.exports = FInteraction
