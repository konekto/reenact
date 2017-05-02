const net = require('net');
const renderer = require('../renderer');

module.exports = () => {

  const server = net.createServer((socket) => {

    console.log('server ready');

    socket.on('data', (data)=> {

      console.log('request received!');

      renderer(JSON.parse(data))
        .then((html) => {

          socket.write(html);
        })
    });
  });

  server.listen(5004, '127.0.0.1');

  return server;
}
