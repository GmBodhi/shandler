# Buttons Documentation

## Overview

Messages can be sent with the components key to add buttons and other components \(when discord brings them out\), you can edit and add new buttons via editing the message, this is useful for the `disabled` key to stop people from clicking it.

### Example Payload

```text
{
    "content": "this is an example message for components",
    "components": [
        {"type": 1, "components": [
            {"type": 2, "style": 2, "label": "Button 1", "custom_id": "1"},
            {"type": 2, "style": 2, "label": "Button 2", "custom_id": "2"}
        ]}
    ]
}
```

### Message

Extending the message payload.

| Key | Value |
| :--- | :--- |
| components? | list of [Component](buttons-documentation.md#component) |

### Component

| Key | Value | Description |
| :--- | :--- | :--- |
| type | [ComponentType](buttons-documentation.md#componenttype) | the type of component |
| style? | [ComponentStyle](buttons-documentation.md#componentstyle) | the style of button |
| custom\_id? | string | the internal id of the button, set this yourself, mutually exclusive with `url` |
| label? | string | the text on the button |
| url? | string | used to set the url for hyperlinks |
| emoji? | [PartialEmoji](buttons-documentation.md#partialemoji) | used for an emoji in the button text |
| disabled? | boolean | used to enabled and disable the button - defaults to false |
| components? | list of [Component](buttons-documentation.md#component) | children components |

### ComponentType

| Key | ID | Description |
| :--- | :--- | :--- |
| buttons | 1 | used as the parent of buttons, takes a list of components with the `components` key with the type of `2` |
| button | 2 | an actual button |

### ComponentStyle

| Key | ID | Description |
| :--- | :--- | :--- |
| blurple | 1 | a blurple coloured button |
| grey | 2 | a grey coloured button |
| green | 3 | a green coloured button |
| red | 4 | a red coloured button |
| hyperlink | 5 | a grey hyperlink button, set the link in the `url` key |

### PartialEmoji

| Key | Value |
| :--- | :--- |
| name? | string |
| id? | snowflake |

### InteractionData

Extending the interaction data payload.

| Key | Value |
| :--- | :--- |
| custom\_id? | string |
| component\_type? | [ComponentType](buttons-documentation.md#componenttype) |

