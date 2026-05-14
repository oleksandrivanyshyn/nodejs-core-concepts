const net = require('net');

const server = net.createServer();

const clients = [];

server.on('connection', (socket) => {
  console.log('A new connection to the server!');

  socket.on('data', (data) => {
    for (const client of clients) {
      console.log(client.address());
      client.write(data);
    }
  });
  clients.push(socket);
});

server.listen(3008, '127.0.0.1', () => {
  console.log('opened server on', server.address());
});
