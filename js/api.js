const { APIMessage } = require("discord.js");
module.exports = {
  async createAPIMessage(int, content, bot) {
    const apiMessage = await APIMessage.create(
      bot.channels.resolve(int.channel_id),
      content
    )
      .resolveData()
      .resolveFiles();

    return { ...apiMessage.data, files: apiMessage.files };
  },
};
