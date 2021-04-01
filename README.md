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

### [Discord.js Guildmember object](https://discord.js.org/#/docs/main/stable/class/GuildMember)

```js
//Guildmember object
{
    bannable:'',
    client:'',
    deleted:'',
    displayColor:'',
    displayHecColor:'',
    displayName:'',
    guild:'',
    id:'',
    joinedAt:'',
    joinedTimestamp:'',
    kickable:'',
    lastMessage:'',
    lastMessageChannelID:'',
    lastMessageID:'',
    manageable:'',
    nickname:'',
    partial:'',
    permissions:'',
    premiumSince:'',
    premiumSinceTimestamp:'',
    presence:'',
    roles:'',
    user:'',
    voice:''
}
```
Methods | Short description
-------- | -----
[ban](https://discord.js.org/#/docs/main/stable/class/GuildMember?scrollTo=ban)
[createDM](https://discord.js.org/#/docs/main/stable/class/GuildMember?scrollTo=createDM)
[deleteDM](https://discord.js.org/#/docs/main/stable/class/GuildMember?scrollTo=deleteDM)
[edit](https://discord.js.org/#/docs/main/stable/class/GuildMember?scrollTo=edit)
[fetch](https://discord.js.org/#/docs/main/stable/class/GuildMember?scrollTo=fetch)
[hasPermission](https://discord.js.org/#/docs/main/stable/class/GuildMember?scrollTo=hasPermission)
[kick](https://discord.js.org/#/docs/main/stable/class/GuildMember?scrollTo=kick)
[permissionsIn](https://discord.js.org/#/docs/main/stable/class/GuildMember?scrollTo=permissionsIn)
[send](https://discord.js.org/#/docs/main/stable/class/GuildMember?scrollTo=send)
[setNickname](https://discord.js.org/#/docs/main/stable/class/GuildMember?scrollTo=setNickname)
[toString](https://discord.js.org/#/docs/main/stable/class/GuildMember?scrollTo=toString)
### [Discord.js Guild object](https://discord.js.org/#/docs/main/stable/class/Guild)


```js
//Guild object
{"members":["708965864128380960","756393473430519849","596409100598771732","766218089032318998","461123923862355988","782471706102333450","818385325956136960","726800141851295814","388399672323997696","670988293835456543","811704233304260667","270904126974590976","796990587861336095","796007012537860146","489316992398917643","622110828996460545","594928035636052002","302050872383242240","557883863070932994","796612852571045928","270359706575306763","706756799721766943","711285328173989928","216303189073461248","751888087021256704","422087909634736160","814841189332942868","787144042596007937","270148059269300224","810508685952417833","787524573221748738","664861408323960832","816597519979118593","796264464093282305","799472806118162432","750332946065653842","646316946144493578","799529251115630623","785255618336260148","764288293167693874","728611546678427739","802225396414283777","295167975634370560"],"channels":["796551553325989898","804370936118771763","795946204701261824","805612013647560757","795946341620645908","796551627423219732","796246319039381564","804368703831539793","818879547633434665","796048435789692938","786548091112259595","808306324390543381","816637533458661436","808306762418618378","816648362614325268","804370742878928946","796295682835218462","816954064318889994","818054900570521600","814148559154577438","796754372867915787","804370573861191721","786544962962718752","795951958468722688","795951024366944316","808331551963873291","816972832092454932","804371034131660810","796423068557115392","804371604233781280","818437042249138248","804369951011504129","818666353221304320","786544962962718750","803938041814974504","796753925562171432","805461375937282068","786544962962718753","819758942736744459","805457879280254996","816613105672781864","804368924111405070","796215958863478814","796216493238124584","796551854170570752","786548138411819010","806382513122574386","795944811848007680","818116472579948595","823105534453874718","814071671551295498","
815889096349974549","795946177404600320","811102765446201354","796652823718658088","815566526849482772","810763819479203870","796215998499127297","795946301997056060","816954003061473300","795946002519556096","795946321743183914","805461038085701713"],"roles":[
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
            "iconURL":"https://cdn.discordapp.com/icons/786544962451144736/ff66b965fe166d8988b231bdc3b41afd.webp%22,%22splashURL%22:null,%22discoverySplashURL%22:null,%22bannerURL%22:null%7D"
}
```
