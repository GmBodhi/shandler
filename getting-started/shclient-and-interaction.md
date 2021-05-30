# SHClient and Interaction

## SHClient Options

```javascript
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

#### Properties

```javascript
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

[_Guildmember object_](https://discord.js.org/#/docs/main/stable/class/GuildMember)  
__[_Client object_](https://discord.js.org/#/docs/main/stable/class/Client)  
__[_Guild object_](https://discord.js.org/#/docs/main/stable/class/Guild)  
__[_Channel object_](https://discord.js.org/#/docs/main/stable/class/Channel)

## Message Property

With Shandler's newest update, you can use [message methods](https://discord.js.org/#/docs/main/master/class/Message). 

```javascript
interaction.reply('bello').then(m => {
m.message.<method>
})
```

Find another example [here](methods.md#reactions) with reactions.

**If it is an ephemeral response this WONT work**

