import { EventEmitter } from "events";
import { ISHClient, ISHClientOptions, ISHCommand } from "../typings";
import { resolve, normalize, sep } from "path";
import { omit } from "lodash";
import axios from "axios";
import { RESTPostAPIApplicationCommandsJSONBody } from "discord-api-types";
class SHClient extends EventEmitter implements ISHClient {
  #token: string;
  typescript: boolean;
  clientID: string;
  /**
   * @class
   * @classdesc
   * @extends EventEmitter
   * @author Arnav Mishra
   * @license MIT
   * @version 1.0.0

   * @description
   * This class is used to create a new instance of Shandler.
   * @param {ISHClientOptions} options - The options to be used for creating a new instance of Shandler.
   */
  constructor(options: ISHClientOptions) {
    super();
    this.#token = options.token;
    this.typescript = options.typescript || false;
    this.clientID = options.clientID;
  }
  /**
   * 
   * @param commands - The commands to be used for the bot(Absolute paths).
   * @returns {Promise<void>}
   * @description
   * This method is used to register the commands globally!
   * @author Arnav Mishra
   
   */
  async register(commands: string[]) {
    let files: any | ISHCommand[] = [];
    const populateFIles = async () => {
      return new Promise((res) => {
        commands.forEach(async (command) => {
          if (
            resolve(command) !==
            normalize(command).replace(RegExp(sep + "$"), "")
          ) {
            throw new Error(
              `SHClient > The command path for ${command} is not absolute, To obtain the absolute path path.join(__dirname + "commandfoldername" + "commandfilename.js")`
            );
          }
          const file = await import(command);
          if (!this.typescript) {
            files.push(omit(file, ["default"]));
          } else files.push(file.default);
        });
        res(files);
      });
    };

    files = await populateFIles();
    files.forEach(async (element: ISHCommand) => {
      await axios
        .post(
          `https://discord.com/api/v8/applications/${this.clientID}/commands`,
          element as RESTPostAPIApplicationCommandsJSONBody,
          {
            headers: {
              Authorization: `Bot ${this.#token}`,
            },
          }
        )
        .catch((err) => console.log(err));
    });
  }
}

export = SHClient;
