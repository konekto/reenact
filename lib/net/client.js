const net = require("net");
const config = require("../config");

module.exports = options => {
  const client = new net.Socket();
  const opts = Object.assign({}, config, options);

  client.connect(opts.port, opts.address, () => {
    client.write(
      JSON.stringify({
        file: options.file,
        data: options.data
      })
    );
  });

  return client;
};
