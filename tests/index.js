const SHClient = require("../dist/index.js");
const config = require("./config.json");
new SHClient({
  token: config.token,
}).register(["/home/arnav/Documents/shandler/tests/command1.js"]);
