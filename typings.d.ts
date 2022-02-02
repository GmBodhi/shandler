/**
 * @typedef ISHClient
 */
export interface ISHClient {
  commands: string[];
}
/**
 * @typedef ISHClientOptions
 * @property {string} token - The token to be used for authenticating with the discord API.
 * @property {string[]} commands - The commands to be used for the bot(Absolute paths).
 *
 */
export interface ISHClientOptions {
  commands: string[];
  token: string;
}
