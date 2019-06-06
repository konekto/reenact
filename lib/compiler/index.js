require("@babel/register")({
  babelrc: false,
  presets: [require.resolve('@konekto/preset-react')]
});

module.exports = path => {
  return require(path);
};
