#!/usr/bin/env node
'use strict';

const meow = require('meow');
const path = require('path');


// called directly
if (require.main === module) {

  const cli = meow(`
	
	Usage
	  $ react-render-html -f <file> -d <data>

	Options
	  --file file of the component 
	  --data data to pass to the component
	  --port port to connect to
	  --address address to connect to
	  --server starts the server


	Examples
	  $ react-render-html --server
	  $ react-render-html -f components/timer.js -d '{"value" : 12213213}'
`, {
    alias: {
      f: 'file',
      d: 'data',
      p: 'port',
      a: 'address'
    }
  });

  const flags = cli.flags;

  // start the server
  if(flags.server) {

    return require('../lib/net/server')();
  }

  const options = {

    file: path.resolve(process.cwd(), flags.file),
    data: JSON.parse(flags.data),
    isDev: flags.dev,
    port: flags.port,
    address: flags.address
  };

  const client = require('../lib/net/client')(options)

  client.pipe(process.stdout);
  client.on('data', ()=> process.exit())
}