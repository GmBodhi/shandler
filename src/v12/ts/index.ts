import * as fs from 'fs'
import * as path from 'path'
import { Collection, Client, WebSocketManager, WSEventType } from 'discord.js'

declare module "discord.js" {
    interface Client {
        commands: Collection<string, Record<string, any>>;
    }
}

type Options = {
    commandsDir:string
    showLogs:string
    autoDelete:boolean
    cLogs:boolean
}

interface SHClient{
    client:Client
    cLogs:boolean
}
class SHClient {

    constructor (client: Client, options = {}){

        let {
            commandsDir = '',
            showLogs = 'extra',
            autoDelete = true,
            cLogs = false
        } = options as Options;

        //errors
        if (!client) throw new Error('No discord.js client was provided\n Fix: Give discord.js client as the first argument.');
        if (!commandsDir.length) console.warn('please specify a commands folder')
        if (!fs.existsSync(path.resolve(process.cwd(), commandsDir))) throw new Error(`Provided commands dir (${commandsDir}) does not exist`);
        
        this.client = client
        this.cLogs = cLogs

        //command registration
        // @ts-ignore
        let app = this.client.api.applications(client.user.id)
        
        this.client.commands = new Collection()
        
        const cmdfls = fs.readdirSync(path.resolve(process.cwd(), commandsDir)).filter(m => m.endsWith('.js'))
        for (const f in cmdfls) {
            const scmd = require(path.resolve(process.cwd(), commandsDir, f))
            scmd.name = (scmd.name ? scmd.name : f.replace(/\.js$/i, ''))
            this.client.commands.set(scmd.name, scmd)
            if (showLogs == 'extra') console.log(scmd.name+' was loaded')
        }
        if (showLogs == 'normal') console.log(this.client.commands.size+' Commands were loaded..!')
        
        
        this.client.on('ready', async () => {
            
            //Global commands auto delete
            if (autoDelete == true){
                // @ts-ignore
                let gcmds = await this.client.api.applications(this.client.user.id).commands.get()
                gcmds.filter((c:any) => !(this.client.commands.filter(m => !m.guilds).map(m => m.name.toLowerCase()).includes(c.name.toLowerCase()))).forEach((e:any) =>{
                    // @ts-ignore
                    this.client.api.applications(this.client.user.id).commands(e.id).then(m =>{
                         console.log("Command: "+e.name+" was deleted")
                         if (cLogs) console.log(m)
                        })
                })
            }

            //commands registration
            let data:any = []
            
            this.client.commands.each(async e => {
                if (!e.guilds.length){
                    data.push({
                        name: e.name,
                        description: e.description,
                        options: e.options
                    })
                } else {
                    e.guilds.forEach(async (el:any) => {
                        app.guilds(el).commands.post({
                            data:{
                                name: e.name,
                                description: e.description || "An awesome command..!",
                                options: e.options
                            }
                        }).then((m:any) =>{
                            if (showLogs == 'extra') console.log('Command: '+e.name+' was registered for: '+el)
                            if (cLogs) console.log(m)
                        })
                    });
                }
            })
            app.commands.put({
                data:data
            }).then((c:any) => {
                if (cLogs) console.log(c)
                if (showLogs == 'normal') console.log(c.length + " Commands were registered")
            }).catch(console.error)
            if (showLogs == 'normal') console.log(this.client.commands.size+ ' commands were registered on discord API')

                if (showLogs == ('normal'||'extra')) console.log(this.client.user?.tag+' is ready.')
        })


        // @ts-ignore
        this.client.ws.on('INTERACTION_CREATE', async (interaction) => {
            require(path.resolve(__dirname,'./init'))(interaction, this.client)
        })

    }
    delete(guilds:any, info:any){
        if (!this.client.readyAt) throw new Error('Cannot use this method before client is ready.\nUse this method inside ready event');
        if (!guilds || !info) throw new Error('Missing params: `guilds:Array, info:Object` are required')
        guilds.forEach((g:any) => {
            // @ts-ignore
            let cmds = await this.client.api.applications(this.client.user.id).guilds(g).commands.get()
            let cmd = cmds.find((m:any) => m.id == info.id || m.name.toLowerCase() == info.name.toLowerCase())
            if (!cmd) return;
            // @ts-ignore
            this.client.api.applications(this.client.user.id).guilds(g).commands(cmd.id).delete().then(m =>{
                if (this.cLogs) console.log(m)
            })
        })
    }
}

export default {SHClient}