const net = require("net");
const config = require("../config");

/**
 * A Socket client that reads the response from the server
 * the first byte determines if a request contains an error or a success
 * 0 is an error
 * 1 is a success
 * @param {*} options
 * @param {*} cb
 */
module.exports = (options, cb) => {
  const client = new net.Socket();
	const opts = Object.assign({}, config, options);

  client.connect(opts.port, opts.address, () => {
    client.write(
      JSON.stringify({
        file: options.file,
        props: options.props,
        context: options.context
      })
    );
  });

  // read the first Byte
  client.once("readable", () => {
    var r = client.read(1).toString("utf8");

    if (r === "0") {
      return cb(client);
    }

    return cb(null, client);
  });

  return client;
};
