const net = require("net");
const config = require("../config");
const chalk = require("chalk");
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

    const firstBite =  client.read(1);
    const r = firstBite.toString("utf8");

		// we got an error
    if (r === "0") {

      return cb(client);
    }

    return cb(null, client);
	});

	client.on("error", (err)=> {

		if(err.code === "ECONNREFUSED") {

			error("the connection was refused");
			error("please verify the server is running and that you connected to the right port and address");
			error(`you where trying to connect to ${opts.address}:${opts.port}`);
			return;
		}

		error(err);
	});

  return client;
};

// better error logger
function error(...messages) {

	console.error(chalk.red(...messages))
}
