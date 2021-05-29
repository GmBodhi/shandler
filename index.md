<div align="center">
  <p>
    <a href="https://www.npmjs.com/package/shandler"><img src="https://nodei.co/npm/shandler.png?compact=true" alt="NPM Banner"></a>
  </p>
</div>

# What is this package about..?

This is a wrapper/command-handler for discord's new **Slash Commands**. Using this package, you can send/edit/delete an interaction response. As well as followup messages and more.
Need support? Join our [Support server](https://discord.gg/tMWmEJFq4m).
## Table of Contents
* [Installation](#installation)
* [Basic-usage](#basic-usage)
    * [Command-handler](#command-handler)
    * [Wrapper](#wrapper)
* [SHClient Options](#shclient-options)
* [Interaction object](#interaction-object)
    * [Properties](#properties)
* [Methods](#methods)
    * [Replying](#replying)
    * [Editing](#edit)
    * [Delete](#delete)
    * [Private Messages](#private-responses)
    * [Follow-up Messages](#follow-up-messages)
    * [Reactions](#reactions)
* [Commands](#dommands)
    * [Registration](#registering-a-command)
    * [Deletion](#deletion-without-shandler)
* [Buttons](#buttons)
    * [Getting Started](#getting-started)
    * [Adding Buttons](#Adding-Buttons-to-Commands)
    * [Button Clicks](#button-clicks)
    * [Embeds](#sending-an-embed-with-buttons)
## Installation

```
npm i shandler
```

## Basic usage
You can use this package as a [wrapper](#Wrapper) for the discord api or as a [command handler](#Command-handler)
### Command handler

#### Setup
**Free advice: Please don't copy paste then ask for support because you don't understand it.**
```js
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
    autoRegister: true // Automatically register commands
}

const handler = new SHClient(client, options);
```
#### Let's make a command file.
```js
//ping.js
module.exports = {
    name: 'ping',// Will default to filename if this is empty
    description: 'Is this unusual?',//Default: "An awesome command..!"
    options:[]//We will cover this in the next part
    guilds: [] /*This is for guild specific command registration
    if this is empty, this command will be registered globally*/
    async run({interaction, client}){
        let ping = Date.now()
        interaction.reply("Pinging..!").then(m => {
            m.edit('My ping is '+ Date.now() - ping +'ms')
        })
    }
}
```
#### Command Options
You might've thought what all we can do with the `options`. Well you can refer [here](https://discord.com/developers/docs/interactions/slash-commands#applicationcommandoption) at the Discord Doumentation.

### Wrapper
#### Starting Setup.
```js
//index.js
const SHClient = require('shandler');
const Discord = require('discord.js');

const client = new Discord.Client();

const options = {
    showLogs: 'extra', // "extra"|"normal"|null (default: "extra")
    wrapper: true // defaults to false
}

const handler = new SHClient(client, options);

client.on('ready', () => {
    console.log(client.user.tag, "is ready");
})
handler.on('interaction', (interaction) => {
    console.log(interaction);
})

```

#### Registering a command
for registering a command you can use the `.create()` method.
```js
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
## SHClient Options
```js
// These are the default values
{
    commandsDir = 'commands', // Commands dir
    showLogs = 'extra', // ('extra'|'normal'|null)
    autoDelete = true, // Automatically deletes the Global commands if command files are not found
    cLogs = false, // Console.log most of the promises 
    wrapper = false, /* Use this package as a wrapper 
    You may need to delete/register commands 
    using the create/delete methods*/
    autoRegister = true // Automatically registers commands accoring to the command files
}
```
## Interaction object
Unlike discord's normal interaction object, Shandler's interaction object has more properties and discord.js methods. 
### Properties
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
### Methods

#### Replying
Responds to an interaction
```js
interaction.reply('Bello').then(console.log);
```
 returns <Promise [FInteraction]()\>
<details>
<summary>Example</summary>
<br>

Code:
```js
//reply.js
module.exports = {
  name: 'reply',// Will default to filename if this is empty.
  description: 'Reply to the interaction',//Default: "An awesome command..!"
  guilds: ['789259215868395552'],  /*This is for guild specific command registration. If this is empty, the command will be registered globally*/
  async run({ interaction, client }) {
    interaction.reply('Bello').then(console.log); //Send the interaction message, then log it.
  }
}
```

![Slash Commands](https://i.imgur.com/KRjFo8F.png)

![Slash Command](https://i.imgur.com/MEikv19.png)
<br><br>
</details>

#### Edit
Edits an interaction response which was sent using the `.reply()` method.
```js
interaction.reply('Bello').then(m => {
    m.edit("Pog");
})

```
 returns <Promise [FInteraction]()\>

<details>
<summary>Example</summary>
<br>

Code:
```js
//edit.js
module.exports = {
  name: 'edit',// Will default to filename if this is empty.
  description: 'Edit an interaction reply',//Default: "An awesome command..!"
  guilds: ['789259215868395552'],  /*This is for guild specific command registration. If this is empty, the command will be registered globally*/
  async run({ interaction, client }) {
    interaction.reply('Bello').then(m => { //Send the message.
      m.edit("Pog"); //edit the message.
    })
  }
}
```
![Slash Command](https://i.imgur.com/umRf62O.png)
<br><br>
</details>

#### Delete
Deletes an interaction respnse which was sent using the `.reply()` method.
```js
interaction.reply('Bello').then(m => {
    setTimeout(() => {
        m.delete()
    }, 5000)
})
```


<details>
<summary>Example</summary>
<br>

Code:
```js
//delete.js
module.exports = {
  name: 'delete',// Will default to filename if this is empty.
  description: 'Delete the message after 5000ms',//Default: "An awesome command..!"
  guilds: ['789259215868395552'],  /*This is for guild specific command registration. If this is empty, the command will be registered globally*/
  async run({ interaction, client }) {
    interaction.reply('Bello').then(m => { //Send the reply.
      setTimeout(() => { //Set timeout for 5000 ms.
        m.delete(); //Delete the message.
      }, 5000);
    })
  }
}
```
*No screenshot, because it deletes lol*
<br><br>
</details>

## Follow-up Messages
Follow-up messages allows you to send multiple messages from a single interaction. Here is an example.

```js
let m = await interaction.reply("Bello");
let i = await m.reply("This is a follow-up message");
i.reply("This is another follow-up message").then(console.log);
```
Follow-up messages and interaction responses work with a unique interaction token which is generated when an interaction is created. This unique token is only valid for 15 minutes. Then, interaction response/follow-up messages sent after that won't be successful.

<details>
<summary>Example</summary>
<br>

Code:
```js
//followup.js
module.exports = {
  name: 'followup',// Will default to filename if this is empty.
  description: 'Follow-up to an interaction',//Default: "An awesome command..!"
  guilds: ['789259215868395552'],  /*This is for guild specific command registration. If this is empty, the command will be registered globally*/
  async run({ interaction, client }) {
    let m = await interaction.reply("Bello"); //Send the first message.
    let i = await m.reply("This is a follow-up message"); //Send the first Follow up message.
    i.reply("This is another follow-up message"); //Send another Follow up message.
  }
}
```
![Slash Command](https://i.imgur.com/S68T9dg.png)
<br><br>
</details>

## Private Responses
Using flags we can create private responses. Here is an example.
```js
interaction.reply("Private Message", { flags: 64 })
```

<details>
<summary>Example</summary>
<br>

Code:
```js
//private.js
module.exports = {
  name: 'private',// Will default to filename if this is empty.
  description: 'Private Response.',//Default: "An awesome command..!"
  guilds: ['789259215868395552'],  /*This is for guild specific command registration. If this is empty, the command will be registered globally*/
  async run({ interaction, client }) {
    interaction.reply("Private Message", { flags: 64 }) //Send the interaction message, but as a private message.
  }
}
```
![Slash Command](https://i.imgur.com/ty9clTb.png)
<br><br>
</details>

This will only respond to the author of the interaction, find the [Docs here](https://canary.discord.com/developers/docs/interactions/slash-commands#interaction-response-interactionapplicationcommandcallbackdata)

### Reactions
With shandler's newest update we can now react to messages. 
```js
interaction.reply('bello').then(m => m.message.react('👀'))
```

<details>
<summary>Example</summary>
<br>

```js
//react.js
module.exports = {
    guilds: ['826662403810131988'],
    name: 'react',
    async run({ interaction }) {
        interaction.reply("React!").then(m => {
            m.message.react('👀')
        })
    }
}
```

![Slash Commands](https://i.imgur.com/HLhSUhk.png)

<br><br>
</details>

## Commands
For registering and deleting commands, you can use the following methods (Guild specific commands won't be automatically deleted even if `autoDelete` is `true`)

## Deletion without Shandler
Normally to delete a command you would have to use
```js
<client>.api.applications(client.user.id).commands('COMMAND-ID').delete(); //globad command
<client>.api.applications(client.user.id).guilds('GUILD-ID').commands('COMMAND-ID').delete(); //guild specific commmand
```
## Deletion with Shandler
With Shandler, you can use the much easier `.delete()` method.
```js
const commands = [
    {
        name:'ping',//this is optional when there is an id
        id:'965874566987541265'/* this is optional when there is a name,
        as we will fetch all the commands and then find the command
        according to the given values */
    },
    {
        name:'user',
        id:'877645876978676234'
    }
]
const guild = []
client.on('ready', () => {
    handler.delete(commands,guild)
})
```                                                              

## Buttons
With Discord's newest update, we are abble to add buttons to our slash commands! [Find our example here!](https://github.com/GmBodhi/shandler-buttons)

![Slash Commands](https://i.imgur.com/wb4Qai6.png)


### Getting Started 

First, I recommend to check out the [Overview](https://github.com/Crispy-Cream/shandler#overview) and [Example Payload](https://github.com/Crispy-Cream/shandler#example-payload) in our documentation. Or just open the tab below.


<details>
<summary>Button Documentation</summary>
<br>

### Overview
Messages can be sent with the components key to add buttons and other components (when discord brings them out), you can edit and add new buttons via editing the message, this is useful for the `disabled` key to stop people from clicking it.

### Example Payload
```json
{
    "content": "this is an example message for components",
    "components": [
        {"type": 1, "components": [
            {"type": 2, "style": 2, "label": "Button 1", "custom_id": "1"},
            {"type": 2, "style": 2, "label": "Button 2", "custom_id": "2"}
        ]}
    ]
}
```

### Message
Extending the message payload.
|  Key        | Value                           |
|-------------|---------------------------------|
| components? | list of [Component](#Component) |


### Component
| Key         | Value                             | Description                                                                            |
|-------------|-----------------------------------|----------------------------------------------------------------------------------------|
| type        | [ComponentType](#ComponentType)   | the type of component                                                                  |
| style?      | [ComponentStyle](#ComponentStyle) | the style of button                                                                    |
| custom_id?  | string                            | the internal id of the button, set this yourself, mutually exclusive with `url`        |
| label?      | string                            | the text on the button                                                                 |
| url?        | string                            | used to set the url for hyperlinks                                                     |
| emoji?      | [PartialEmoji](#PartialEmoji)     | used for an emoji in the button text                                                   |
| disabled?   | boolean                           | used to enabled and disable the button - defaults to false                             |
| components? | list of [Component](#Component)   | children components                                                                    |


### ComponentType

| Key     | ID | Description                                                                                              |
|---------|----|----------------------------------------------------------------------------------------------------------|
| buttons | 1  | used as the parent of buttons, takes a list of components with the `components` key with the type of `2` |
| button  | 2  | an actual button                                                                                         |


### ComponentStyle
| Key       | ID | Description                                            |
|-----------|----|--------------------------------------------------------|
| blurple   | 1  | a blurple coloured button                              |
| grey      | 2  | a grey coloured button                                 |
| green     | 3  | a green coloured button                                |
| red       | 4  | a red coloured button                                  |
| hyperlink | 5  | a grey hyperlink button, set the link in the `url` key |


### PartialEmoji

| Key   | Value     |
|-------|-----------|
| name? | string    |
| id?   | snowflake |


### InteractionData
Extending the interaction data payload.
| Key             | Value                           |
|-----------------|---------------------------------|
| custom_id?      | string                          |
| component_type? | [ComponentType](#ComponentType) |

<br><br>
</details>

### Adding Buttons to Commands
To add a button or buttons to a command we need to set it up a little like this: 
```js
//ping.js
module.exports = {
    guilds: ['826662403810131988'],
    name: 'ping',
    async run({ interaction }) {
        let cmp = [
            {
                "type": 1, "components": [
                    { "type": 2, "style": 1, "label": "Button 1", "custom_id": "1" }, //this is your first button
                    { "type": 2, "style": 4, "label": "Button 2", "custom_id": "2" } //this is your second button
                ]
            }
        ]
        interaction.reply("Pong!", { components: cmp, type: 4 }).then(m => {
        })
    }
}
```
Find **all** the possible componets for the payload [here](https://github.com/Crispy-Cream/shandler#component).

You can find all options for *"type"* [here](https://github.com/Crispy-Cream/shandler#componenttype).
Find all the options for *"style"* [here](https://github.com/Crispy-Cream/shandler#componentstyle). *"label"* is the name of the button that will be shown. The *"custom_id"* is the id of the specific button to be accessed later, we will address this more later.

### Button Clicks
When someone clicks on a button, it will fire an event called 'buttonClick'. 

```js
client.on('buttonClick', async (button) => {
    if (button.data.custom_id === "1") {
        let cmp = [
            {
                "type": 1, "components": [
                    { "type": 2, "style": 1, "label": "Button 1", "custom_id": "3" },
                ]
            }
        ]
        button.reply("Buttons!", { components: cmp, type: 7 }) //This will edit the message and buttons.
    } else if (button.data.custom_id === "2") {
        button.reply('Hiii!') //This will reply to the interaction
    } else if (button.data.custom_id === "3") {
        button.reply("Heya!", { flags: 64 }) //This will reply to the interaction with an ephemeral message. 
    }
})
```

### Sending an Embed with Buttons
```js
//ping.js
const discord = require('discord.js')
module.exports = {
    guilds: ['826662403810131988'],
    name: 'ping',
    async run({ interaction }) {
        let cmp = [
            {
                "type": 1, "components": [
                    { "type": 2, "style": 1, "label": "Button 1", "custom_id": "1" },
                    { "type": 2, "style": 4, "label": "Button 2", "custom_id": "2" }
                ]
            }
        ]

        let embed = new discord.MessageEmbed()
            .setTitle('Pong!')
            .setDescription("Example Description!")

        interaction.reply("", { components: cmp, type: 4, embed: embed, }).then(m => {
        })
    }
}
```

![Slash Commands](https://i.imgur.com/7SoToK5.png)
