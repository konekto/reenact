process.env['NODE_ENV'] = 'production'

require("babel-preset-react-app");
require("babel-preset-es2015");

require("babel-register")({
  extensions: [".jsx", ".js"],
  env: process.env,
  babelrc: false,
  cache: true,
  presets: ["babel-preset-es2015", "babel-preset-react-app"].map(require.resolve)
});

module.exports = path => {
  return require(path);
};
