# Getting Started with Buttons

## The Basics

First, I recommend checking out the [Overview](buttons-documentation.md#overview) and [Example Payload](buttons-documentation.md#example-payload) in our documentation. Click [here](buttons-documentation.md) to see all of the button's documentation.

## Adding Buttons to Commands

To add a button or buttons to a command we need to set it up a little like this. [**Example**](https://github.com/GmBodhi/shandler-example-bot/blob/master/commands/button.js#L8-L15)\*\*\*\*

```javascript
let cmp = [
    {
        "type": 1, "components": [
            { "type": 2, "style": 1, "label": "Button 1", "custom_id": "1" }, //this is your first button
            { "type": 2, "style": 4, "label": "Button 2", "custom_id": "2" } //this is your second button
        ]
    }
]
interaction.reply("Pong!", { components: cmp, type: 4 })
```

Find **all** the possible components for the payload [here](buttons-documentation.md#example-payload).

You can find all options for _"type"_ [here](buttons-documentation.md#componenttype). Find all the options for _"style"_ [here](buttons-documentation.md#componentstyle). _"label"_ is the name of the button that will be shown. The _"custom\_id"_ is the id of the specific button to be accessed later, we will address this more later.

#### Action Rows

Adding multiple rows of buttons looks a little like this. [**Example**](https://github.com/GmBodhi/shandler-example-bot/blob/master/commands/actionrow.js#L8-L19)\*\*\*\*

```javascript
let cmp = [
    {
        "type": 1, "components": [
            { "type": 2, "style": 1, "label": "Button 1", "custom_id": "1" }, //this is your first button on the first row
            { "type": 2, "style": 4, "label": "Button 2", "custom_id": "2" } //this is your second button on the first row
        ]
    },
    {
        "type": 1, "components": [
            { "type": 2, "style": 1, "label": "Button 3", "custom_id": "11" }, //this is your first button on the second row
            { "type": 2, "style": 4, "label": "Button 4", "custom_id": "22" } //this is your second button on the second row
        ]
    }
]
```

