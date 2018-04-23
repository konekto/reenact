const Promise = require("bluebird");
const { renderToNodeStream } = require("react-dom/server");
const compile = require("../compiler");
const debug = require("../debug");
const invalidate = require('../invalidate');

module.exports = {
  renderToString: _renderToString,
  renderToNodeStream: _renderToNodeStream
};

/**
 * Render a template and return HTML
 * @param options
 */
function _renderToString(options) {

	try {

		const stream = _renderToNodeStream(options);

		return StreamToString(stream);

	}catch(err) {

		return Promise.reject(err);
	}
}

/**
 * Render a Component to a node stream
 * @param options
 */
function _renderToNodeStream(options) {
  const { file, props, context, isDev } = options;

	if (isDev) {

		invalidate(file);
	}

  const view = compile(file);
	const stream = renderToNodeStream(view.default(props, context));

  stream.on("error", debug.error);

  return stream;
}

/**
 * Write a stream to a string
 * @param {*stream.Readable} stream
 */
function StreamToString(stream) {
  return new Promise((resolve, reject) => {
    const chunks = [];

    stream.on("data", function(chunk) {
      chunks.push(chunk);
    });

    stream.on("error", reject);

    stream.on("end", function() {
      resolve(Buffer.concat(chunks).toString('utf8'));
    });
  });
}
