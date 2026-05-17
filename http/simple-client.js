const http = require('http');

const agent = new http.Agent({ keepAlive: true });
const request = http.request({
  hostname: 'localhost',
  port: 8050,
  agent,
  method: 'POST',
  path: '/create-post',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(
      JSON.stringify({ title: 'Hey you still there?' }),
    ),
  },
});
// request.write(JSON.stringify({ title: 'Hi there!' }));
// request.write(JSON.stringify({ title: 'How are you doing?' }));
request.write(JSON.stringify({ title: 'Hey you still there?' }));
//request.end(JSON.stringify({ title: 'This is going to be my last message!' }));

request.on('response', (response) => {
  console.log(response.statusCode);
});
