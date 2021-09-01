const express = require("express");
const cors = require("cors");
class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT || 3000;
    this.usuariosPath="/api/usuarios";

    //application middleware
    this.middleware();
    //application routes
    this.router();
  }

  middleware() {
    //using cors
    this.app.use(cors());

    //parse and reading of body
    this.app.use(express.json());
    
    //public directory
    this.app.use(express.static("public"));
  }

  router() {
    this.app.use(this.usuariosPath, require("../routes/usuarios"));
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Server is listening on port ${this.port}`);
    });
  }
}

module.exports = Server;
