import * as fs from 'fs'
import * as path from 'path'
import { Collection, Client, WebSocketManager, WSEventType } from 'discord.js'

declare module "discord.js" {
    interface Client {
        commands: Collection<string, Record<string, any>>;
    }
}


type Options = {
    commandsDir: string
    helpTemplate: string
    showLogs: string
}

interface SHClient {
    client: Client
}

class SHClient {

    constructor (client: Client, options = {}) {

        let {
            commandsDir = '',
            helpTemplate = 'normal',
            showLogs = 'extra' 
        } = options as Options;

        //errors
        if (!client) throw new Error('No discord.js client was provided\n Fix: Give discord.js client as the first argument.');
        if (!commandsDir.length) console.warn('please specify a commands folder')
        if (!fs.existsSync(path.resolve('../../', commandsDir))) throw new Error(`Provided commands dir (${commandsDir}) does not exist`);
        
        this.client = client

        //command registration        
        // @ts-ignore
        let app = this.client.api.applications(client.user.id)
        
        this.client.commands = new Collection()
        
        const cmdfls = fs.readdirSync(path.resolve('../../', commandsDir)).filter(m => m.endsWith('.js'))
        for (const f in cmdfls) {
            const scmd = require(path.resolve('../../', commandsDir,f))
            scmd.__name == f            
            this.client.commands.set(scmd.name, scmd)
            // @ts-ignore
            if (showLogs == 'extra') console.log(f.name+ ' was loaded')
        }
        if (showLogs == 'normal') console.log(this.client.commands.size+' Commands were loaded..!')
        
        
        this.client.on('ready', async () => {
            
            //Global commands auto delete
            // @ts-ignore
            let gcmds = await this.client.api.applications(this.client.user.id).commands().get()
            gcmds.filter((c: any) => !(this.client.commands.filter(m => !m.guilds).map(m => m.name.toLowerCase()).includes(c.name.toLowerCase()))).forEach((e: any) =>{
                // @ts-ignore
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
                    e.guilds.forEach(async (el: any) => {
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

                if (showLogs == ('normal'||'extra')) console.log(this.client.user!.tag+' is ready.')
        })



        // @ts-ignore
        this.client.ws.on('INTERACTION_CREATE', async (interaction) => {
            require(path.resolve(__dirname,'./init'))(interaction, this.client)
        })

    };
}


export = { SHClient }