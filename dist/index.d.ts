import { Client } from 'discord.js';
declare module "discord.js" {
    interface Client {
        commands: Collection<string, Record<string, any>>;
    }
}
interface SHClient {
    client: Client;
    cLogs: boolean;
}
declare class SHClient {
    constructor(client: Client, options?: {});
    delete(guilds: any, info: any): void;
}
declare const _default: {
    SHClient: typeof SHClient;
};
export default _default;
