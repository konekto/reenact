const net = require("net");
const path = require("path");
const serializeError = require('serialize-error');
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
      log("delivered in:", getElapsedTime(hrstart), "ms");
    });

    socket.on("data", data => {
      log("data received in:", getElapsedTime(hrstart), "ms");

      if(opts.isDev) {

      	log(data);
			}

      let stream;

      try {
        data = JSON.parse(data);

        // add defaults
        Object.assign(data, {
        	isDev: opts.isDev,
					file: path.resolve(process.cwd(), data.file)
        });

        stream = renderToNodeStream(data);

        stream.on("error", err => sendError(socket, err));

				// the once is really important as readable event trigger also at the end of the stream
				// oh you node streams
        stream.once("readable", () => {

					socket.write("1");
					stream.pipe(socket);
				});

      } catch (err) {
        sendError(socket, err);
      }
    });
  });

  server.on("error", err => {
    if (err.code === "EADDRINUSE") {
      error(
        `the server couldn't start because the address ${opts.address}:${opts.port} is in use`
      );
      error(
        `please verify you entred the right address and port or that another server is running`
      );
      return;
    }

    error(err);
  });

  server.listen(opts.port, opts.address, () => {
    log(`server running on ${opts.address}:${opts.port}`);

    if (opts.isDev) {
      log("dev mode activated");
    }
  });

  return server;
};

// send error to socket
function sendError(socket, err) {
  const errorString = JSON.stringify(serializeError(err));

  error("error occured:", errorString);

  socket.write("0");
  socket.write(errorString);
  socket.end();
}

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

  return hrend[0] * 1000 + hrend[1] / 1000000;
}
