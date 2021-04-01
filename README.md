# What is this package about..?

This is a package is a command handler for discord's new **Slash Commands**. Using this package you can send/edit/delete an interaction response. You can ask for help in our [Support server](https://discord.gg/tMWmEJFq4m).

## Table of Contents
* [Installation](#Installation)
* [Basic-usage](#Basic-usage)
* [Interaction object](#Interaction-object)

## Installation

```
npm i shandler
```

## Basic usage
#### Setup
**Free advice:** Please don't copy paste.
```js
//index.js
const Shandler = require('shandler')
const Discord = require('discord.js')

const client = new Discord.Client()

const options = {
    commandsDir: './commands', // commands folder path (required)
    showLogs: 'extra', // "extra"|"normal"|null (default: "extra")
}

const handler = new Shandler(client, options)

```
#### Let's make a command file.
```js
//ping.js
module.exports ={
    name: 'ping',// if (!name) command name == filename.
    description: 'Is this unusual?',//Default: "An awesome command..!"
    options:[]//We will cover this in the next part
    guilds : [] /*This is for guild specific command registration
    if this is empty, this command will be registered globally*/
    async run({interaction, client}){
        interaction.send("My ping is " + client.ws.ping + "ms")
    }
}
```
## Command Options
You might've thought what all we can do with the `options`. Well you can refer [here](https://discord.com/developers/docs/interactions/slash-commands#applicationcommandoption)
## Interaction object
Unlike discord's normal interaction object shandler's interaction object has more properties and disscord.js methods. 
```js
{
    "type": 2,
    "token": "A_UNIQUE_TOKEN",
    "member": [discord.js guildmember object],
    "id": "786008729715212338",
    "guild": [discord.js guild object],
    "data": {
        "options": [{
            "name": "cardname",
            "value": "The Gitrog Monster"
        }],
        "name": "cardsearch",
        "id": "771825006014889984"
    },
    "channel": [discord.js channel object]
}
```
### [Discord.js uildmember object](https://discord.js.org/#/docs/main/stable/class/GuildMember)

```js
//user object
{
    avatar:'',
    bot:'',
    client:'',
    createdAt:'',
    createdTimestamp:'',
    defaultAvatarURL:'',
    discriminator:'',
    dmChannel:'',
    flags:'',
    id:'',
    lastMessage:'',
    lastMessageChannelID:'',
    lastMessageID:'',
    locale:'',
    partial:'',
    presence:'',
    system:'',
    tag:'',
    username:''
}
```

### [Discord.js Guild object](https://discord.js.org/#/docs/main/stable/class/Guild)

```js
```

### [Discord.js user object](https://discord.js.org/#/docs/main/stable/class/User)

```js
```
