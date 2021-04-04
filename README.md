# What is this package about..?

This is a package is a command handler for discord's new **Slash Commands**. Using this package you can send/edit/delete an interaction response. Also supports followup messages. You can ask for help in our [Support server](https://discord.gg/tMWmEJFq4m).

## Table of Contents
* [Installation](#Installation)
* [Basic-usage](#Basic-usage)
* [Interaction object](#Interaction-object)
    * [Properties](#Properties)
    * [Methods](#Methods)
* [Follow-up Messages](#Follow-up-Messages)

## Installation

```
npm i shandler
```

## Basic usage
#### Setup
**Free advice:** Please don't copy paste.
```js
//index.js
const {SHClient} = require('shandler')
const Discord = require('discord.js')

const client = new Discord.Client()

const options = {
    commandsDir: './commands', // commands folder path (required)
    showLogs: 'extra', // "extra"|"normal"|null (default: "extra")
}

const handler = new SHClient(client, options)

```
#### Let's make a command file.
```js
//ping.js
module.exports = {
    name: 'ping',// if (!name) command name == filename.
    description: 'Is this unusual?',//Default: "An awesome command..!"
    options:[]//We will cover this in the next part
    guilds: [] /*This is for guild specific command registration
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
## Properties
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
[Client object](https://discord.js.org/#/docs/main/stable/class/Client)<br>
[Guild object](https://discord.js.org/#/docs/main/stable/class/Guild)<br>
[Channel object](https://discord.js.org/#/docs/main/stable/class/Channel)<br>
## Methods

### Reply
Responds to an interaction
```js
interaction.reply('Bello').then(console.log)
```
 returns <Promise FInteraction\>
### Edit
Edits an interaction response which was sent using the `.reply()` method ( using this method without sending a response can cause errors )
```js
interaction.reply('Bello').then(console.log)
setTimeout(() => {
    interaction.edit('Pog').then(console.log)
}, 5000)
```
 returns <Promise FInteraction\>
### Delete
Deletes an interaction respnse which was sent using the `.reply()` method ( using this method without sending a response can cause errors )
```js
interaction.reply('Bello').then(console.log)
setTimeout(() => {
    interaction.delete()
}, 5000)
```
## Follow-up Messages
Follow-up messages allows you to send multiple messages from a single interaction. Here is an example.

```js
let m = await interaction.reply("Bello")
let i = await m.reply("This is a follow-up message")
i.reply("This is another follow-up message").then(console.log)
```
Follow-up messages and interaction responses work with a unique interaction token which is generated when an interaction is created. This token is only valid for 15 minutes, interaction response/follow-up message sent after that won't be successful