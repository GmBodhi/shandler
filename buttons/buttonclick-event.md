# buttonClick Event

## Button Clicks

When someone clicks on a button or uses a dropdown, it will fire an event called 'buttonClick'.

```javascript
client.on('buttonClick', async (button) => {
});
```

### Replying to buttons

We can reply when a button is clicked using `.reply()`.

```javascript
button.reply("");
```

If needed, you are able to add embeds, flags, attachments, and type in the reply. Check [Methods](../interactions/methods.md#interaction).

### Updating buttons

We can edit the original message that had the buttons using `.update()`.

```javascript
button.update("");
```

If needed, you are able to add embeds, flags, attachments, and type in the reply. Check [Methods](../interactions/methods.md#interaction).

## Examples

### Buttons

Here is an example of how to check for button IDs and how to handle them. \***Example soon\***

```javascript
client.on('buttonClick', async (button) => {
    if (button.data.custom_id === "1") {

        button.reply("Heya!"); //Reply to the interaction.

    } else if (button.data.custom_id === "2") {

        button.update("Edited the button :)"); //This will edit the original message. 

    } else if (button.data.custom_id === "3") {

        button.reply("Heya!", { flags: 64 }); //This will reply to the interaction with an ephemeral message. 

    } else if (button.data.custom_id === "4") {

        let cmp = [
            {
                "type": 1, "components": [
                    { "type": 2, "style": 1, "label": "Button 1", "custom_id": "3" },
                ]
            }
        ];

        button.update("Buttons!", { components: cmp });

    };
});
```

### Dropdowns

Here is an example of how to check for dropdown information and how to handle them. \***Example soon\***

```javascript
client.on('buttonClick', async (button) => {
    if (button.data.custom_id === "dropdown1") {

        if (button.data.values[0] === "hmmm") {

            button.reply(`🤔`)

        } else if (button.data.values[0] === "test") {

            button.reply(`Tests`)

        }
    };
});
```

