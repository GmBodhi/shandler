---
description: Registration and Deletion
---

# Deleting Commands

For registering and deleting commands, you can use the following methods \(Guild specific commands won't be automatically deleted even if `autoDelete` is `true`\)

## Deletion without Shandler

Normally to delete a command you would have to use

```javascript
<client>.api.applications(client.user.id).commands('COMMAND-ID').delete(); //globad command
<client>.api.applications(client.user.id).guilds('GUILD-ID').commands('COMMAND-ID').delete(); //guild specific commmand
```

## Deletion with Shandler

With Shandler, you can use the much easier `.delete()` method.

```javascript
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

