const FInteraction = require("./FInteraction");
const { APIMessage } = require("discord.js");

const Callback = async (res, data) => {
  if (!data || !res) return;
  if (!res.token) throw new Error("Token missing");
  data.token = res.token;
  let guild = res.guild;
  let member = res.member;
  let channel = res.channel;
  let extras = {
    member,
    channel,
    guild,
    user: res.user ?? null,
  };
  let interaction = new FInteraction(res.client, data, extras);
  return interaction;
};

class Interaction {
  /**
   * Class for replaying to an interaction or other purposes
   * @param {Object} interaction - Raw interaction object from the api
   * @param {*} options - Extra data
   */
  constructor(interaction, options) {
    let {
      channel,
      guild = null,
      client,
      member = null,
      user = null,
      sync,
    } = options;
    this.type = interaction.type;
    this.token = interaction.token;
    this.member = member;
    this.id = interaction.id;
    this.message = interaction.message ?? null;
    this.client = client;
    this.guild = guild;
    this.data = interaction.data;
    this.channel = channel;
    this.user = user;
    this.sync = sync;
  }
  /**
   * Sends an Interaction response
   * @param {String} res - The message string or embed object
   * @param {import("./FInteraction").Options} options - Options that should be passed to the api
   * @returns {Promise<Object>}  FInteraction object
   * @example
   * interaction.reply("Bello")
   */
  async reply(res, options = {}) {
    let { files } = await APIMessage.create(this.channel, res, options)
      .resolveData()
      .resolveFiles();
    let {
      embed,
      embeds = [],
      flags = null,
      type = this.type === 3 ? 7 : 4,
      tts = false,
      components = [],
    } = options;
    this.ephemeral = flags == 64 ? true : false;
    let data;
    if (
      !res &&
      !options.embed &&
      !options.embeds &&
      !options.files &&
      ![6, 5].includes(type)
    )
      throw new Error("Cannot send an empty message.");
    if (embed) embeds.push(embed);
    data = {
      content: res || "",
      embeds: embeds,
      flags: flags,
      tts: tts,
      components: components,
    };

    let b = await this.client.api
      .interactions(this.id, this.token)
      .callback.post({
        data: {
          type: type,
          data: data,
        },
        files,
      });
    if (this.sync && !this.ephemeral)
      b = await this.client.api
        .webhooks(this.client.user.id, this.token)
        .messages("@original")
        .get();
    return await Callback(this, b);
  }

  /**
   * besically `interaction.reply("", { type: 6 or 5 })`
   * @returns {Promise<Object>} FInteraction object
   */
  async defer() {
    return await this.reply("", { type: this.type === 3 ? 6 : 5 });
  }

  /**
   *basically `interaction.reply()` using type 7
   * @param {string} res - string that needs to passed to `.reply` function
   * @param {import("./FInteraction").Options} options - options
   * @returns {Promise<Object>} FInteraction object
   */
  async update(res, options) {
    options["type"] ??= 7;
    return await this.reply(res, options);
  }

  /**
   *
   * @returns {boolean} - Whether it's an interaction from a component
   */
  isComponent() {
    return this.type === 3 ? true : false;
  }

  /**
   *
   * @returns {boolean} - Whether it's an interaction from a slash command
   */
  isCommand() {
    return this.type === 2 ? true : false;
  }
}
module.exports = Interaction;
