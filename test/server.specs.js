const assert = require("assert");
const path = require("path");
const server = require("../lib/net/server");
const client = require("../lib/net/client");

describe("Server Specs", function() {

  before(() => server());

  it("should render component file", function(done) {
    const request = client({
      file: path.resolve(__dirname, "stubs/component.jsx"),
      props: { text: "test" }
    });

    request.on("data", buff => {
			const resp = buff.toString('utf8');
			assert.equal(resp.slice(0,1), '1');
      assert.equal(resp.slice(1), '<div data-reactroot="">test</div>');
      done();
    });
	});

	it("should throw an error for file not found", function(done) {
    const request = client({
      file: path.resolve(__dirname, "stubs/doesntexist.jsx"),
      props: { text: "test" }
		});

    request.on("data", buff => {

			const resp = buff.toString('utf8');

      assert.equal(resp.slice(0, 1), '0');
      done();
    });
  });
});
