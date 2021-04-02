# What is this package about..?

This is a package is a command handler for discord's new **Slash Commands**. Using this package you can send/edit/delete an interaction response. You can ask for help in our [Support server](https://discord.gg/tMWmEJFq4m).

## Table of Contents
* [Installation](#Installation)
* [Basic-usage](#Basic-usage)
* [Interaction object](#Interaction-object)
    * [Guildmember object](#Guildmember-object)
    * [Guild object](#Guild-object)
    * [Channel object](#Channel-object)

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
        interaction.reply("My ping is " + client.ws.ping + "ms")
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

### [Guildmember object](https://discord.js.org/#/docs/main/stable/class/GuildMember)

```js
//Guildmember object
{
    bannable: false,
    client: [Client object],
    deleted: false,
    displayColor: RANDOM,
    displayHecColor: 0xffffff,
    displayName: 'Gm',
    guild: [Guild object],
    id:'708965864128380960',
    joinedAt:'',
    joinedTimestamp:'',
    kickable: false,
    lastMessage: [Message object],
    lastMessageChannelID:'938965863828380943',
    lastMessageID:'725203764128346893',
    manageable: false,
    nickname: null,
    partial: false,
    permissions: [Permission manager],
    premiumSince:'',
    premiumSinceTimestamp:'',
    presence: [Presence object],
    roles: [Role manager],
    user: [User object],
    voice: [Voice state]
}
```
Methods | Short description
-------- | -----
[ban](https://discord.js.org/#/docs/main/stable/class/GuildMember?scrollTo=ban) | Bans the member from the <br /> guild.
[createDM](https://discord.js.org/#/docs/main/stable/class/GuildMember?scrollTo=createDM) | creates a DM channel <br/> b/w client and the member.
[deleteDM](https://discord.js.org/#/docs/main/stable/class/GuildMember?scrollTo=deleteDM) | Deletes the DM channel <br /> b/w client and the member.
[edit](https://discord.js.org/#/docs/main/stable/class/GuildMember?scrollTo=edit)|
[fetch](https://discord.js.org/#/docs/main/stable/class/GuildMember?scrollTo=fetch)|Fetch the member
[hasPermission](https://discord.js.org/#/docs/main/stable/class/GuildMember?scrollTo=hasPermission)| Checks if the member has<br> a permission
[kick](https://discord.js.org/#/docs/main/stable/class/GuildMember?scrollTo=kick)|Kicks the member from the <br />guild.
[permissionsIn](https://discord.js.org/#/docs/main/stable/class/GuildMember?scrollTo=permissionsIn)|Permissions in a particular <br />channel
[send](https://discord.js.org/#/docs/main/stable/class/GuildMember?scrollTo=send)|Send a message in their DM
[setNickname](https://discord.js.org/#/docs/main/stable/class/GuildMember?scrollTo=setNickname)|Sets the n ickname of the <br>member
[toString](https://discord.js.org/#/docs/main/stable/class/GuildMember?scrollTo=toString)
### [Guild object](https://discord.js.org/#/docs/main/stable/class/Guild)


```js
//Guild object
{
    "members":[
        "708965864128380960",
        "756393473430519849"
    ],
    "channels":[
        "796551553325989898",
        "804370936118771763"
    ],
    "roles":[
        "786544962451144736",
        "795978550880239626"
    ],
    "deleted":false,
    "id":"786544962451144736",
    "shardID":0,
    "name":"Exim Studio",
    "icon":"ff66b965fe166d8988b231bdc3b41afd",
    "splash":null,
    "discoverySplash":null,
    "region":"india",
    "memberCount":43,
    "large":false,
    "features":[
        "NEWS",
        "WELCOME_SCREEN_ENABLED",
        "COMMUNITY",
        "PREVIEW_ENABLED",
        "MEMBER_VERIFICATION_GATE_ENABLED"
    ],
    "applicationID":null,
    "afkTimeout":300,
    "afkChannelID":null,
    "systemChannelID":"796423068557115392",
    "premiumTier":0,
    "premiumSubscriptionCount":0,
    "verificationLevel":"MEDIUM",
    "explicitContentFilter":"ALL_MEMBERS",
    "mfaLevel":0,
    "joinedTimestamp":1614255169231,
    "defaultMessageNotifications":"MENTIONS",
    "systemChannelFlags":1,
    "maximumMembers":100000,
    "maximumPresences":null,
    "approximateMemberCount":null,
    "approximatePresenceCount":null,
    "vanityURLCode":null,
    "vanityURLUses":null,
    "description":null,
    "banner":null,
    "rulesChannelID":"796246319039381564",
    "publicUpdatesChannelID":"804370936118771763",
    "preferredLocale":"en-US",
    "ownerID":"764288293167693874",
    "emojis":[
        "805398954430562315",
        "805398954976083968"
    ],
    "createdTimestamp":1607597332347,
    "nameAcronym":"ES",
    "iconURL":"https://cdn.discordapp.com/icons/786544962451144736/ff66b965fe166d8988b231bdc3b41afd.webp"
}
```


### [Channel object](https://discord.js.org/#/docs/main/stable/class/Channel)
```js

```