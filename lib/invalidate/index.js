const dependencyTree = require("dependency-tree");
const fs = require('fs');
const {startTimer, getElapsedTime} = require('../timer');
const store = {};


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

		// const mt = getModificationTime(file);
    //
		// if(store[file] === mt) return;
    //
		// store[file] = mt;

		invalidateRequireCache(file);
	})

	console.log('invalidation took', getElapsedTime('invalidate'), 'ms')
}


function getModificationTime(path) {

	return fs.statSync(path).mtimeMs;
}

/**
 * invalidate the require cache
 * @param dep
 */
function invalidateRequireCache(file) {

	// console.log('invalidating', file);

	delete require.cache[require.resolve(file)];
}

module.exports = invalidate;
