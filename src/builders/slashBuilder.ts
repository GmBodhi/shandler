import { APIApplicationCommand, Snowflake } from "discord-api-types";
import { ApplicationCommandOption, ApplicationCommandPermissionsManager } from "discord.js";

import { SlashCommandOption } from "./option";

let externalData: Partial<APIApplicationCommand> = {
    type: 1,
    options: [],
};

export const setExternalData = (
    fn: (state: Partial<APIApplicationCommand>) => Partial<APIApplicationCommand> | Partial<APIApplicationCommand>
) => {
    if (typeof fn === "object") Object.assign(externalData, fn);
    else externalData = fn(externalData);
};

interface ShandlerGuildCommandPermissionOptions {
    /** Users allowed to use a command */
    users?: Snowflake | Snowflake[];
    /** Roles allowed to use a command */
    roles?: Snowflake | Snowflake[];
    /** Whether this command should be available to moderators.
     *
     * Defaults to true
     */
    mods?: true | boolean;
}

interface ShandlerGuildCommandPermissions {
    id: string;
    permissions?: ShandlerGuildCommandPermissionOptions;
}

interface ShandlerCommandOptions {
    name: string;
    description: string;
    guilds?: ShandlerGuildCommandPermissions[] | Snowflake[];
    options?: ApplicationCommandOption[];

    // /** Don't set this param. It's meant for the module and it's just useless set it */
    // application_id?: string,
    // /** Don't set this param. It's meant for the module and it's just useless to set it*/
    // guild_id?: string
}

export class SlashBuilder {
    private application_id = externalData.application_id;
    private guild_id = externalData.guild_id;

    constructor(public data: ShandlerCommandOptions) {
        this.data = data ?? externalData;
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
        this.guild_id = guildId;
        return this;
    }

    addOption(option: ApplicationCommandOption) {
        this.addOptions(option);
        return this;
    }

    addOptions(...options: ApplicationCommandOption[]) {
        options.forEach(option => {
            this.data.options?.push(option);
        });
        return this;
    }
}
