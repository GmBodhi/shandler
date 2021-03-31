const fs = require('fs')
const path = require('path')
const { APIMessage, Collection } = require('discord.js')

module.exports = class {
    constructor (client, options = {}){
        let {
            commandsDir = '',
            helpTemplate = 'normal',
            showLog = 'extra'
        } = options;

        //errors
        if (!client) throw new Error('No discord.js client was provided\n Fix: Give discord.js client as the first argument.');
        if (!fs.existsSync(commandsDir)) throw new Error(`Provided commands dir (${commandsDir}) does not exist`);
        
        this.bot = client

        //command registration        
        let app = this.bot.api.applications(client.user.id)
        
        this.bot.commands = new Collection()

        const cmdfls = fs.readdirSync('../../'+commandsDir).filter(m => m.endsWith('.js'))
        for (const f in cmdfls) {
            const scmd = require('../../'+commandsDir+'/'+f)            
            this.bot.commands.set(scmd.name, scmd)
            if (showLog == 'extra') console.log(f.name+' was loaded')
        }
        if (showLog == 'normal') console.log(this.bot.commands.size+' Commands were loaded..!')

        this.bot.commands.each(e => {
            if (!e.guilds.length){
                await app.commands.post({
                    data:{
                        name: e.name,
                        description: e.description,
                        options: e.options
                    }
                })
                if (showLog == 'extra') console.log('Command: '+e.name+' was registered')
            } else {
                e.guilds.forEach(el => {
                    await app.guilds(el).commands.post({
                        data:{
                            name: e.name,
                            description: e.description,
                            options: e.options
                        }
                    })
                    if (showLog == 'extra') console.log('Command: '+e.name+' was registered for: '+el)
                });
            }
        })
        if (showLog == 'normal') console.log(this.bot.commands.size+ ' commands were registered on discord API')

        this.bot.on('ready', () => {
            if (showLog == ('normal'||'extra')) console.log(this.bot.user.tag+' is ready.')
        })



        this.bot.ws.on('INTERACTION_CREATE', async (interaction) => {
            require('./init')(interaction, this.bot)
        })

    }
}