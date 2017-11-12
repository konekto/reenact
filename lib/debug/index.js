const debug = require("debug");
const pkg = require("../../package.json");

// log to stdout
const log = debug(pkg.name);

// log to stderr
const error = debug(pkg.name + ":error");

// export
module.exports = { log, error };
