const fs = require('fs')
const path = require('path')
const { Collection } = require('discord.js')

module.exports = class {
    /**
     * 
     * @param {client} client - discord.js client object
     * @param {handlerOptions} options - default to {} 
     */
    constructor (client, options = {}){
        let {
            commandsDir = '',
            helpTemplate = 'normal',
            showLogs = 'extra'
        } = options;

        //errors
        if (!client) throw new Error('No discord.js client was provided\n Fix: Give discord.js client as the first argument.');
        if (!commandsDir.length) console.warn('please specify a commands folder')
        if (!fs.existsSync(path.resolve('../../',commandsDir))) throw new Error(`Provided commands dir (${commandsDir}) does not exist`);
        
        this.client = client

        //command registration        
        let app = this.client.api.applications(client.user.id)
        
        this.client.commands = new Collection()
        
        const cmdfls = fs.readdirSync(path.resolve('../../',commandsDir)).filter(m => m.endsWith('.js'))
        for (const f in cmdfls) {
            const scmd = require(path.resolve('../../',commandsDir,f))
            scmd.__name == f            
            this.client.commands.set(scmd.name, scmd)
            if (showLogs == 'extra') console.log(f.name+' was loaded')
        }
        if (showLogs == 'normal') console.log(this.client.commands.size+' Commands were loaded..!')
        
        
        this.client.on('ready', async () => {
            
            //Global commands auto delete
            let gcmds = await this.client.api.applications(this.client.user.id).commands().get()
            gcmds.filter(c => !(this.client.commands.filter(m => !m.guilds).map(m => m.name.toLowerCase()).includes(c.name.toLowerCase()))).forEach(e =>{
                this.client.api.applications(this.client.user.id).commands(e.id).then(m => console.log("Command: "+e.name+" was deleted"))
            })

            //commands registration
            this.client.commands.each(async e => {
                if (!e.guilds.length){
                    await app.commands.post({
                        data:{
                            name: e.name || e.__name.replace(/.js/i,""),
                            description: e.description || "An awesome command..!",
                            options: e.options
                        }
                    })
                    if (showLogs == 'extra') console.log('Command: '+e.name+' was registered')
                } else {
                    e.guilds.forEach(async el => {
                        await app.guilds(el).commands.post({
                            data:{
                                name: e.name || e.__name.replace(/.js/i,""),
                                description: e.description || "An awesome command..!",
                                options: e.options
                            }
                        })
                        if (showLogs == 'extra') console.log('Command: '+e.name+' was registered for: '+el)
                    });
                }
            })
            if (showLogs == 'normal') console.log(this.client.commands.size+ ' commands were registered on discord API')

                if (showLogs == ('normal'||'extra')) console.log(this.client.user.tag+' is ready.')
        })



        this.client.ws.on('INTERACTION_CREATE', async (interaction) => {
            require(path.resolve(__dirname,'./init'))(interaction, this.client)
        })

    }
}