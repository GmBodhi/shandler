import { APIMessage, Client } from "discord.js";
export default {
  async createAPIMessage(int:any, content:any, bot:Client) {
    const apiMessage = await APIMessage.create(
      // @ts-ignore
      bot.channels.resolve(int.channel_id),
      content
    )
      .resolveData()
      .resolveFiles();

    return { ...apiMessage.data, files: apiMessage.files };
  },
};
