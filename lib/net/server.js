const net = require("net");
const config = require("../config");
const { renderToNodeStream } = require("../renderer");
const {log, error} = console;

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

    socket.on("error", error);
    socket.on("close", () => log("delivered!"));

    socket.on("data", data => {
      log("data received!");

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
