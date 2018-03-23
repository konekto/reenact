#!/usr/bin/env node
"use strict";

const meow = require("meow");

let socket;

// called directly
if (require.main === module) {
  init_cli();
}

function init_cli() {

  const cli = meow(
    `

		Usage
			$ react-render-html -f <file> -d <data>

		Options
			--path file of the component
			--props props to pass to the component
			--context context object to pass to the component
			--port port to connect to
			--address address to connect to
			--server starts the server
			--dev recompiles the components on every request


		Examples
			$ react-render-html --server
			$ react-render-html --file components/timer.js --props '{"value" : 12213213}'
	`,
    {
      alias: {
        f: "file",
				ps: "props",
				c: "context",
        p: "port",
        a: "address"
      }
    }
  );

  const flags = cli.flags;

  // start the server
  if (flags.server) {

		const options =  Object.assign({}, flags, {isDev : flags.dev});

    socket = require("../lib/net/server")(options);

    return;
	}

  const options = Object.assign({}, flags, {
    file: flags.file,
    props: JSON.parse(flags.props),
    isDev: flags.dev,
  });

  const client = require("../lib/net/client")(
    options,
    (errStream, successStream) => {
      if (errStream) {

				return errStream.pipe(process.stderr);
			}

      successStream.pipe(process.stdout);
    }
	);

  client.on("end", () => process.exit());

  socket = client;
}

process.on('SIGINT', () => {

	socket.destroy ? socket.destroy() : socket.close();
	process.exit();
});
