#!/usr/bin/env node
'use strict';

const renderer = require('../lib/renderer');
const meow = require('meow');
const path = require('path');

// called directly
if (require.main === module) {

  const cli = meow(`
	
	Usage
	  $ react-render-html -f <file> -d <data>

	Options
	  --dev  development mode

	Examples
	  $ react-render-html -f components/timer.js -d '{"value" : 12213213}'
`, {
    alias: {
      f: 'file',
      d: 'data'
    }
  });

  const options = {

    file: path.resolve(process.cwd(), cli.flags.file),
    data: JSON.parse(cli.flags.data),
    isDev: cli.flags.dev
  };

  renderer(options).then((html) => {

    process.stdout.write(html);
    process.exit();
  })
}



module.exports = renderer;