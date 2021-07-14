# Methods

## Interaction

### Replying

Responds to an interaction. [**Example**](https://github.com/GmBodhi/shandler-example-bot/blob/master/commands/reply.js)\*\*\*\*

```javascript
interaction.reply('Bello').then(console.log);
```

### **Edit**

Edits an interaction response that was sent using the `.reply()`method. [**Example**](https://github.com/GmBodhi/shandler-example-bot/blob/master/commands/edit.js)\*\*\*\*

```javascript
interaction.reply('Bello').then(m => {
    m.edit("Pog");
});
```

### **Delete**

Deletes an interaction response that was sent using the `.reply()` method. [**Example**](https://github.com/GmBodhi/shandler-example-bot/blob/master/commands/delete.js)\*\*\*\*

```javascript
interaction.reply('Bello').then(m => {
    setTimeout(() => {
        m.delete()
    }, 5000)
});
```

### Follow-up Messages

Follow-up messages allow you to send multiple messages from a single interaction. [**Example**](https://github.com/GmBodhi/shandler-example-bot/blob/master/commands/followup.js)\*\*\*\*

```javascript
let m = await interaction.reply("Bello");
let i = await m.reply("This is a follow-up message");
i.reply("This is another follow-up message").then(console.log);
```

Follow-up messages and interaction responses work with a unique interaction token which is generated when an interaction is created. This unique token is only valid for 15 minutes. Then, interaction response/follow-up messages sent after that won't be successful.

### Ephemeral Responses

Using flags we can create ephemeral \(private\) responses. [**Example**](https://github.com/GmBodhi/shandler-example-bot/blob/master/commands/ephemeral.js)\*\*\*\*

```javascript
interaction.reply("Ephemeral  Message", { flags: 64 });
```

This will only respond to the author of the interaction, find the [Docs here](https://canary.discord.com/developers/docs/interactions/slash-commands#interaction-response-interactionapplicationcommandcallbackdata)

### Reactions

With Shandler's newest update we can now react to messages. [**Example**](https://github.com/GmBodhi/shandler-example-bot/blob/master/commands/ping.js#L10)\*\*\*\*

```javascript
interaction.reply('bello').then(m => m.message.react('👀'));
```

### Attachments

Using Discord.js MessageAttachments, we are able to send attachments in our interactions. [**Example**](https://github.com/GmBodhi/shandler-example-bot/blob/master/commands/attachments.js)\*\*\*\*

```javascript
interaction.reply("", { files: [attachment] });
```

### Embeds

Using Discord.js MessageEmbeds, we are able to send embeds in our interactions. [**Example**](https://github.com/GmBodhi/shandler-example-bot/blob/master/commands/embed.js)\*\*\*\*

```javascript
interaction.reply("", { embed: embed, });
```

### Defer

Send type 5 replies with ease. [**Example**](https://github.com/GmBodhi/shandler-example-bot/blob/master/commands/defer.js)\*\*\*\*

```javascript
interaction.defer();
```

## Checks

### isComponent\(\)

Check to see if an interaction is a component. Returns a boolean.

```javascript
<interaction>.isComponent();
```

### isCommand\(\)

Check to see if an interaction is a command. Returns a boolean.

```javascript
<interaction>.isCommand();
```
