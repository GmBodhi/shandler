# Basic Usage

You can use this package as a [wrapper](basic-usage.md#wrapper) for the Discord API or as a [command handler](basic-usage.md#command-handler).

### Command handler

#### Setup

**Free advice:** Please **don't copy-paste** then ask for support because you don't understand it.

```javascript
//index.js
const SHClient = require('shandler');
const Discord = require('discord.js');

const client = new Discord.Client();

const options = {
    commandsDir: 'commands', // commands folder path (required)
    showLogs: 'extra', // "extra"|"normal"|null (default: "extra")
    wrapper: false, // defaults to false
    cLogs: true, // logs most of the resolved promises
    autoDelete: true, // Automatically syncs the global application commands
    autoRegister: true, // Automatically register commands
    exclude: ['file'] // Exclude a file from the command directory. Make sure you only put the file name.
}

const handler = new SHClient(client, options);
```

**Let's make a command file.**

```javascript
//ping.js
module.exports = {
    name: 'ping',// Will default to filename if this is empty
    description: 'Is this unusual?',//Default: "An awesome command..!"
    options:[], //We will cover this in the next part
    guilds: [], /*This is for guild specific command registration
    if this is empty, this command will be registered globally*/
    async run({interaction, client}){
        let ping = Date.now()
        interaction.reply("Pinging..!").then(m => {
            m.edit('My ping is '+ Date.now() - ping +'ms')
        })
    }
}
```

**Command Options**

You might've thought what all we can do with the `options`. Well, you can refer [here](https://discord.com/developers/docs/interactions/slash-commands#applicationcommandoption) at the Discord Documentation.

### Wrapper

**Starting Setup.**

```javascript
//index.js
const SHClient = require('shandler');
const Discord = require('discord.js');

const client = new Discord.Client();

const options = {
    showLogs: 'extra', // "extra"|"normal"|null (default: "extra")
    wrapper: true, // defaults to false
}

const handler = new SHClient(client, options);

client.on('ready', () => {
    console.log(client.user.tag, "is ready");
});

handler.on('interaction', (interaction) => {
    console.log(interaction);
});
```

**Registering a command**

for registering a command you can use the `.create()` method.

```javascript
const commands = [
    {
        name:'ping',
        description:'Is this unusual?',
        options:[]
    },
    {
        name:'user',
        description:'Shows the info of a user',
        options:[
            {
                name:'user',
                description:'A user..!',
                type: 6
            }
        ]
    }
]
const guilds = [] //for guild specific commands pass an array for guildIDs. If none, will default to global command.
client.on('ready', () => {
    handler.create(commands, guilds);
})
```

