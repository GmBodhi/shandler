module.exports = class {
    /**
     * 
     * @param {Object} interaction 
     * @param {Object} options 
     */
    constructor(interaction, options){
        
        let {channel, guild, client, member} = options
        this.type = interaction.type
        this.token = interaction.token
        this.member = member
        this.id = interaction.id
        this.guild = guild
        this.client = client
        this.channel = channel


    }
}