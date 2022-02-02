import { APIApplicationCommand } from "discord-api-types";

import { SlashCommandOption } from "./option";

let externalData: Partial<APIApplicationCommand> = {
  type: 1,
  options: [],
};

export const setExternalData = (
  fn: (
    state: Partial<APIApplicationCommand>
  ) => Partial<APIApplicationCommand> | Partial<APIApplicationCommand>
) => {
  if (typeof fn === "object") Object.assign(externalData, fn);
  else externalData = fn(externalData);
};

export class SlashBuilder {
  data: APIApplicationCommand;
  constructor(data: APIApplicationCommand) {
    this.data = data ?? externalData;
    this.data.application_id = externalData.application_id!;
  }

  setName(name: string) {
    this.data.name = name;
    return this;
  }

  setDescription(description: string) {
    this.data.description = description;
    return this;
  }

  setGuild(guildId: string) {
    this.data.guild_id = guildId;
  }

  addOption(option: SlashCommandOption) {
    this.addOptions(option);
  }

  addOptions(...options: SlashCommandOption[]) {
    this.data.options?.push(...options.map((o) => o.toJSON()));
  }
}
