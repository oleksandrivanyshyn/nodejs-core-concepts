const http = require('http');
const fs = require('fs/promises');

class Butter {
  constructor() {
    this.server = http.createServer();
    this.routes = {};
    this.server.on('request', (req, res) => {
      //Send a file back to the client
      res.sendFile = async (path, mime) => {
        const fileHandle = await fs.open(path, 'r');
        const fileStream = fileHandle.createReadStream();
        res.setHeader('Content-Type', mime);
        fileStream.pipe(res);
      };

      this.routes[req.method.toLowerCase() + req.url](req, res);
    });
  }

  listen = (port, cb) => {
    this.server.listen(port, () => {
      cb();
    });
  };
  route = (method, route, cb) => {
    this.routes[method + route] = cb;
  };
}

module.exports = Butter;
