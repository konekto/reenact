const net = require("net");
const chalk = require("chalk");
const config = require("../config");
const { renderToNodeStream } = require("../renderer");

/**
 * The server that compiles the components to a socket
 * the first byte determines if a request contains an error or a success
 * 0 is an error
 * 1 is a success
 * @param {*} options
 */
module.exports = options => {
  const opts = Object.assign({}, config, options);

  const server = net.createServer(socket => {
		log("request received!");

		// some nice high resulution timer
		let hrstart = process.hrtime();

		socket.on("error", error);

    socket.on("close", () => {

			log("delivered in: ",  getElapsedTime(hrstart), "ms");
		});

    socket.on("data", data => {

      log("data received in: ",  getElapsedTime(hrstart), "ms");

      let stream;

      try {
        data = JSON.parse(data);
        stream = renderToNodeStream(data);
        socket.write("1");
        stream.pipe(socket);
      } catch (err) {
        socket.write("0");
        socket.write(err.toString());
        socket.end();
      }
    });
  });

  server.on("error", error);

  server.listen(opts.port, opts.address, () => {
    log("server ready!");
  });

  return server;
};

// log helper
function log(...messages) {
  console.log(chalk.green(...messages));
}

// error logging helper
function error(...messages) {
  console.error(chalk.red(...messages));
}

// get elapsed time
function getElapsedTime(hrstart) {

	const hrend = process.hrtime(hrstart);

	return hrend[0] * 1000 + hrend[1]/1000000;
}
