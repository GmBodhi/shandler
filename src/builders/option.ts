import { APIApplicationCommandOption } from "discord-api-types";

export class SlashCommandOption {
    data: APIApplicationCommandOption;
    constructor(data: APIApplicationCommandOption) {
        this.data = data;
    }

    toJSON() {
        return this.data;
    }
}