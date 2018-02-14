require("babel-plugin-transform-object-rest-spread");
require("babel-preset-es2015");
require("babel-preset-react");

require("babel-register")({
  extensions: [".jsx", ".js"],
  env: process.env,
  babelrc: false,
  cache: true,
  presets: ["babel-preset-react", "babel-preset-es2015"].map(require.resolve),
  plugins: ["babel-plugin-transform-object-rest-spread"].map(require.resolve)
});

const {resolve} = require("path");

module.exports = path => {
  return require(resolve(process.cwd(), path));
};
