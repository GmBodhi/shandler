# Buttons

With Discord's newest update, we are able to add buttons to our slash commands! [Find our example here!](https://github.com/GmBodhi/shandler-buttons)

![](../../.gitbook/assets/image%20%283%29%20%282%29.png)

#### Getting Started

First, I recommend checking out the [Overview](buttons-documentation.md#overview) and [Example Payload](buttons-documentation.md#example-payload) in our documentation. Click [here](buttons-documentation.md) to see all of the buttons documentation.

## Adding Dropdowns to Commands

Adding dropdowns to commands. Dropdowns **HAVE** to be in their own action row. 

Here is an example of sending a dropdown with a button. The dropdown is the second action row

```javascript
let cmp = [
   {
      'type': 1,
      'components': [
        { "type": 2, "style": 1, "label": "Button 1", "custom_id": "testing" },
        ],
   },
   {
   'type': 1,
   'components': [
       { 'type': 3, 'style': 4, 'label': 'Button 2', 'custom_id': '2', 'options': [{ 'name': 'test', 'value': 'test', 'label': 'test' }, { 'name': 'hmm', 'value': 'hmmm', 'label': 'hmmm' },], },
       ]
 }]
                
interaction.reply("Buttons are cool and stuff", { components: cmp })
```

## Button Clicks <a id="button-clicks"></a>

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
    } else if (button.data.custom_id === "dropdown1") { 
        if (button.data.values[0] === "hmmm") {
          button.reply(`🤔`)
        } else if (button.data.values[0] === "test") {
          button.reply(`Tests`)
        }
    }
})
```

## Sending an Embed with Buttons <a id="sending-an-embed-with-buttons"></a>

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
