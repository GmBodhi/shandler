import { APIApplicationCommandOption } from "discord-api-types";

export class SlashCommandOption{
    constructor(public data: APIApplicationCommandOption) {}

    toJSON() {
        return this.data;
    }
}
