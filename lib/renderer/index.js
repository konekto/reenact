const Promise = require('bluebird');
const dependencyTree = require('dependency-tree');
const {renderToString} = require('react-dom/server');
const compile = require('../compiler');
const debug = require('../debug');


/**
 * Render a template and return HTML
 * @param options
 */
module.exports = function renderer(options) {

  const file = options.file;
  const data = options.data;
  const isDev = options.isDev;

  let view;
  let body;

  try {

    view = compile(file);
    body = renderToString(view.default(data));

  } catch(err) {

    debug.error(err);

    return Promise.reject(err);
  }

  // get the dependency tree for all required files
  const deps = dependencyTree.toList({
    filename: file,
    directory: '/'
  });

  if(isDev) {

    // invalidate cache
    deps.map(invalidateRequireCache)

    invalidateRequireCache(file);
  }

  return Promise.resolve(body);
};

/**
 * invalidate the require cache
 * @param dep
 */
function invalidateRequireCache(dep) {

  delete require.cache[require.resolve(dep)];
}
