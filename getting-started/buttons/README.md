# Buttons

With Discord's newest update, we are able to add buttons to our slash commands! [Find our example here!](https://github.com/GmBodhi/shandler-buttons)

![](../../.gitbook/assets/image%20%282%29.png)

#### Getting Started

First, I recommend to check out the [Overview](buttons-documentation.md#overview) and [Example Payload](buttons-documentation.md#example-payload) in our documentation. Click [here](buttons-documentation.md) to see the all of the buttons documentation.

#### Adding Buttons to Commands <a id="adding-buttons-to-commands"></a>

To add a button or buttons to a command we need to set it up a little like this:

```javascript
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

Find **all** the possible components for the payload [here](https://github.com/Crispy-Cream/shandler#component).

You can find all options for _"type"_ [here](https://github.com/Crispy-Cream/shandler#componenttype). Find all the options for _"style"_ [here](https://github.com/Crispy-Cream/shandler#componentstyle). _"label"_ is the name of the button that will be shown. The _"custom\_id"_ is the id of the specific button to be accessed later, we will address this more later.

#### Button Clicks <a id="button-clicks"></a>

When someone clicks on a button, it will fire an event called 'buttonClick'.

```javascript
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

#### Sending an Embed with Buttons <a id="sending-an-embed-with-buttons"></a>

```javascript
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

![](https://i.imgur.com/7SoToK5.png)





