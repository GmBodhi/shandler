const { Collector } = require('discord.js')

class ButtonClickCollector extends Collector {
    constructor(int, filter, options = {}){
        super(int.client, filter, options)
        
    }
}