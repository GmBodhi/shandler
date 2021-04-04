import { MessageTarget } from 'discord.js';
interface FInteraction {
    client: any;
    res: any;
    extras: Record<any, any>;
    id: string;
    token: string;
    type: number;
    content: string;
    channel: MessageTarget;
    member: object;
    attachments: any;
    embeds: any[];
    mentions: any;
    mentionRoles: any;
    guild: object;
    pinned: boolean;
    mentionEveryone: boolean;
    tts: boolean;
    timestamp: any;
    editedTimestamp: any;
    flags: number;
    webhookID: string;
    messageRefID: any;
    data: any;
}
declare class FInteraction {
    constructor(client: any, res: any, extras: Record<any, any>);
    reply(res: any, options: any): Promise<any>;
    edit(content: string, options: any): Promise<any>;
    delete(): void;
}
export default FInteraction;
