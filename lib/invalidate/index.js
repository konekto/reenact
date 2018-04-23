const dependencyTree = require("dependency-tree");
const chokidar = require('chokidar');
const {startTimer, getElapsedTime} = require('../timer');
const watcher = chokidar.watch();
const watched = {};
const changed = {};

watcher.on('change', (file)=> changed[file] = true);

function invalidate(file) {

	startTimer('invalidate');

	// get the dependency tree for all required files
	const deps = dependencyTree.toList({
		filename: file,
		directory: "/",
		filter: path => path.indexOf('node_modules') === -1,
	});

	const files = [file, ...deps];

	files.forEach((file) => {

		watchFile(file);

		if(!changed[file]) return;

		invalidateRequireCache(file);
	})

	console.log('invalidation took', getElapsedTime('invalidate'), 'ms')
}


/**
 * invalidate the require cache
 * @param dep
 */
function invalidateRequireCache(file) {

	console.log('invalidating', file);

	delete require.cache[require.resolve(file)];
	changed[file] = false;
}


function watchFile(file) {

	if(watched[file]) return;

	watched[file] = true;

	watcher.add(file);
}


module.exports = invalidate;
