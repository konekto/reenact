const net = require("net");
const config = require("../config");
const renderer = require("../renderer");
const { log, error } = require("../debug");

module.exports = options => {
  const opts = Object.assign({}, config, options);

  const server = net.createServer(socket => {
    log("request received!");

    socket.on("data", data => {
			log("data received!");

			try{

				renderer(JSON.parse(data)).then(html => {
					socket.write(html + "\r\n");
				});

			}catch(e) {

				error(e);
			}

    });

    socket.on("error", error);

    socket.on("close", () => log("delivered!"));

    socket.on("end", socket.end);
  });

  server.on("error", error);

  server.listen(opts.port, opts.address, () => {
    log("server ready!");
  });

  return server;
};
