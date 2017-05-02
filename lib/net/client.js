const net = require('net');

module.exports = (options, cb) => {

  const client = new net.Socket();

  client.connect(5004, '127.0.0.1', ()=> {

    console.log('client ready');

    client.write(JSON.stringify(options));

    client.on('data', cb);
  })

  return client;
}
