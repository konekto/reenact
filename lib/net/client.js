const net = require('net');
const config = require('../config');

module.exports = (options) => {

  const client = new net.Socket();

  client.connect(options.port || config.port, options.address || config.address, ()=> {

    client.write(
      JSON.stringify({
        file: options.file,
        data: options.data
      })
    );
  });

  return client;
}
