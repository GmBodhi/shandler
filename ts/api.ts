import { APIMessage, MessageEmbed, Client } from "discord.js";

export default {
  async createAPIMessage(int: any, content: MessageEmbed, bot: Client) {
    const apiMessage = await APIMessage.create(
      bot.channels.resolve(int.channel_id) as any,
      content as any
    ) 
      .resolveData()
      .resolveFiles();

    return { ...apiMessage.data, files: apiMessage.files };
  },
};
