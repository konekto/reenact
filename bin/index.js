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
	  --server starts the server


	Examples
	  $ react-render-html -f components/timer.js -d '{"value" : 12213213}'
`, {
    alias: {
      f: 'file',
      d: 'data'
    }
  });

  // start the server
  if(cli.flags.server) {

    return require('../lib/net/server')();
  }


  const options = {

    file: path.resolve(process.cwd(), cli.flags.file),
    data: JSON.parse(cli.flags.data),
    isDev: cli.flags.dev
  };

 require('../lib/net/client')(options, (html) => {

    console.log('response received');

    process.stdout.write(html);
    process.exit();
  });
}

//
//
// module.exports = renderer;