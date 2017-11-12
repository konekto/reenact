#!/usr/bin/env node
"use strict";

const meow = require("meow");
const path = require("path");

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
			--file file of the component
			--data data to pass to the component
			--port port to connect to
			--address address to connect to
			--server starts the server
			--dev recompiles the components on every request


		Examples
			$ react-render-html --server
			$ react-render-html -f components/timer.js -d '{"value" : 12213213}'
	`,
    {
      alias: {
        f: "file",
        d: "data",
        p: "port",
        a: "address"
      }
    }
  );

  const flags = cli.flags;

  // start the server
  if (flags.server) {
    return require("../lib/net/server")();
	}

  const options = Object.assign({}, flags, {
    file: path.resolve(process.cwd(), flags.file),
    props: JSON.parse(flags.data),
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
}
