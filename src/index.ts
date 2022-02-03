import { EventEmitter } from "events";
import { ISHClient, ISHClientOptions } from "../typings";
import { resolve, normalize, sep } from "path";
import { omit } from "lodash";
class SHClient extends EventEmitter implements ISHClient {
  #token: string;
  typescript: boolean;
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
  }
  /**
   * 
   * @param commands - The commands to be used for the bot(Absolute paths).
   * @returns {Promise<void>}
   * @description
   * This method is used to register the commands globally!
   * @author Arnav Mishra
   
   */
  register(commands: string[]) {
    let files: string[] | any = [];
    commands.forEach(async (command) => {
      if (
        resolve(command) !== normalize(command).replace(RegExp(sep + "$"), "")
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
  }
}

export = SHClient;
