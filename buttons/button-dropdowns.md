# Dropdowns

## Adding Dropdowns to Commands

Adding dropdowns to commands. Dropdowns **NEED** to be in their own action row. Here is an example of sending a dropdown with a button. The dropdown is the second action row.  [**Example**](https://github.com/GmBodhi/shandler-example-bot/blob/master/commands/dropdowns.js#L8-L20)\*\*\*\*

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

