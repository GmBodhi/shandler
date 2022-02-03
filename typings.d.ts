/**
 * @typedef ISHClient
 */
export interface ISHClient {
  typescript: boolean;
}
/**
 * @typedef ISHClientOptions
 * @property {string} token - The token to be used for authenticating with the discord API.
 * @property {string[]} commands - The commands to be used for the bot(Absolute paths).
 *
 */
export interface ISHClientOptions {
  token: string;
  typescript?: boolean;
}

export interface ISHCommand {
  name: string;
  description: string;
}
