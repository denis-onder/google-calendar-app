const express = require("express");
const { port, env } = require("./config").server;
const applyMiddleware = require("./middleware");
const router = require("./router");
const { join } = require("path");
const engine = require("./engine");

class Server {
  constructor() {
    // Initialize application
    this.app = express();
    // Initialize static files and templating engine
    this.initTemplatingEngine();
    // Apply middleware
    applyMiddleware(this.app);
    // Initialize router
    router(this.app);
  }
  initTemplatingEngine() {
    // Point to where the static files are and set the templating engine
    this.app.use(express.static(join(__dirname, "../public")));
    engine(this.app);
  }
  start() {
    this.app.listen(port, err =>
      err
        ? this.stop(err)
        : console.log(
            `Server running!\nAddress: http://localhost:${port}\nEnvironment: ${env}`
          )
    );
  }
  stop(err = false) {
    console.log(err ? err : "Server shutting down...");
    process.exit(err ? 1 : 0);
  }
}

module.exports = new Server();
