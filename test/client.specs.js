const assert = require("assert");
const path = require("path");
const server = require("../lib/net/server");
const client = require("../lib/net/client");

describe("Client Specs", function() {

	let s;

	before(() => s = server());
	after(()=> s.close());

  it("should render component file", function(done) {
    client(
      {
        file: path.resolve(__dirname, "stubs/component.jsx"),
        props: { text: "test" }
      },
      (errStream, successStream) => {
        assert.equal(errStream, null);

        successStream.on("data", buff => {
          const resp = buff.toString("utf8");

          assert.equal(resp, '<div data-reactroot="">test</div>');
          done();
        });
      }
    );
  });

  it("should throw an error for file not found", function(done) {
    client(
      {
        file: path.resolve(__dirname, "stubs/doesntexist.jsx"),
        props: { text: "test" }
      },
      errStream => {
        errStream.on("data", buff => {
					const resp = buff.toString("utf8");

          assert.equal(resp.slice(0, 5), "Error");
          done();
        });
      }
    );
  });
});
