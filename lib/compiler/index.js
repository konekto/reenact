process.env['NODE_ENV'] = 'production'

require("babel-register")({
  extensions: [".jsx", ".js"],
  env: process.env,
  babelrc: true,
  cache: true,
});

module.exports = path => {
  return require(path);
};
