// TODO: Need to add the code that will run the specific version ig.

var version = require('discord.js').version.split('');
version = parseInt(version[0] + version[1]);

module.exports = (client) => {

    if (version < 11 || version === 11) {
        throw new Error('The discord.js version must be v12 or high');
    }

    if (version === 12) {
        // ?: src/v12/js/index.js
    } else if (version === 13) {
        // ?: src/v13/js/index.js
    }

    return;
}