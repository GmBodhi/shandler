# What is this package about..?

This is a package is a command handler for discord's new **Slash Commands**. Using this package you can send/edit/delete an interaction response. You can ask for help in our [Support server](https://discord.gg/tMWmEJFq4m).

## Table of Contents
* [Installation](#Installation)
* [Basic-usage](#Basic-usage)
* [Interaction object](#Interaction-object)
    * [Properties](#Properties)
    * [Methods](#Methods)

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
module.exports = {
    name: 'ping',// if (!name) command name == filename.
    description: 'Is this unusual?',//Default: "An awesome command..!"
    options:[]//We will cover this in the next part
    guilds : [] /*This is for guild specific command registration
    if this is empty, this command will be registered globally*/
    async run({interaction, client}){
        let ping = Date.now()
        interaction.reply("Pinging..!")
        interaction.edit('My ping is '+ Date.now() - ping +'ms')
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
    "member": [Guildmember object],
    "id": "786008729715212338",
    "client": [Client object],
    "guild": [Guild object],
    "data": {
        "options": [{
            "name": "cardname",
            "value": "The Gitrog Monster"
        }],
        "name": "cardsearch",
        "id": "771825006014889984"
    },
    "channel": [Channel object]
}
```
[Guildmember object](https://discord.js.org/#/docs/main/stable/class/GuildMember)<br>
[Guild object](https://discord.js.org/#/docs/main/stable/class/Guild)<br>
[Channel object](https://discord.js.org/#/docs/main/stable/class/Channel)<br>

### Send
Sends the response after eating the user interaction
```js
interaction.send('Bello')
```
### Reply
Responds to an interaction
```js
interaction.reply('Bello')
```
### Edit
Edits an interaction response
```js
interaction.reply('Bello')
setTimeout(() => {
    interaction.edit('Pog')
}, 5000)
```
### Delete
Deletes an interaction respnse
```js
interaction.reply('Bello')
setTimeout(() => {
    interaction.delete()
}, 5000)
```