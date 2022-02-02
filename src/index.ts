import { EventEmitter } from "events";
import { ISHClient, ISHClientOptions } from "../typings";

export class SHClient extends EventEmitter implements ISHClient {
  commands: string[] = [];
  #token: string;
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
  }
}

export default SHClient;
