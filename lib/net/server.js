const net = require('net');
const renderer = require('../renderer');

module.exports = () => {

  const server = net.createServer((socket) => {

    console.log('request received!')

    socket.on('data', (data)=> {

      console.log('data received!');

      renderer(JSON.parse(data))
        .then((html) => {

          socket.write(html);
        })
    });

    socket.on('close', ()=> {

      console.log('delivered!');
    })
  });

  server.on('error', (err)=> {

    console.error(err);
  });

  server.listen(5004, ()=> {

    console.log('server ready!')
  });

  return server;
}
