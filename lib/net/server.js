const net = require('net');
const config = require('../config');
const renderer = require('../renderer');

module.exports = (options) => {

  const server = net.createServer((socket) => {

    console.log('request received!')

    socket.on('data', (data)=> {

      console.log('data received!');

      renderer(JSON.parse(data))
        .then((html) => {

          socket.write(html + '\r\n');
        })
    });

    socket.on('error', (err)=> {

      console.error(err);
    });

    socket.on('close', ()=> {

      console.log('delivered!');
    });

    socket.on('end', socket.end);
  });

  server.on('error', (err)=> {

    console.error(err);
  });

  server.listen(options.port || config.port, options.address || config.address, ()=> {

    console.log('server ready!');
  });

  return server;
}
