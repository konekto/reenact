process.env['NODE_ENV'] = 'production'

require("babel-preset-react-app");
require("babel-preset-es2015");

require("babel-register")({
  extensions: [".jsx", ".js"],
  env: process.env,
  babelrc: false,
  cache: true,
	presets: ["babel-preset-react", "babel-preset-es2015"].map(require.resolve),
	plugins: ["babel-plugin-transform-object-rest-spread"].map(require.resolve)

});

module.exports = path => {
  return require(path);
};
