const assert = require("assert");
const path = require("path");
const { renderToString } = require("../lib/renderer");

describe("Renderer Specs", function() {
  it("should render component file", function(done) {
    renderToString({
      file: path.resolve(__dirname, "stubs/component.jsx"),
      props: { text: "test" }
    }).then(html => {
      assert.equal(html, '<div data-reactroot="">test</div>');
      done();
    });
  });

  it("should render nested component file", function(done) {
    renderToString({
      file: path.resolve(__dirname, "stubs/nested.jsx"),
      props: { text: "test" }
    }).then(html => {
      assert.equal(html, '<div data-reactroot="">test</div>');
      done();
    });
  });

  it("should render component with modules", function(done) {
    renderToString({
      file: path.resolve(__dirname, "stubs/with-module.jsx"),
      props: { value: new Date(681436800000) }
    }).then(html => {
      assert.equal(
        html,
        '<time data-reactroot="">1991-08-06T02:00:00+02:00</time>'
      );
      done();
    });
	});
});
