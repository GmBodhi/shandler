import { MessageEmbed, APIMessageContentResolvable } from "discord.js";
interface Interaction {
    interaction: Record<any, any>;
    options: object;
    type: number;
    token: string;
    member: any;
    id: string;
    client: any;
    guild: any;
    data: object;
    channel: any;
    content: any;
}
declare class Interaction {
    constructor(interaction: {
        type: number;
        token: string;
        id: string;
        data: object;
    }, options: {
        channel: any;
        guild: any;
        client: any;
        member: any;
    });
    reply(res: any, options: any): Promise<any>;
    edit(content: APIMessageContentResolvable | string | MessageEmbed, options: any): Promise<any>;
    delete(): void;
}
export default Interaction;
