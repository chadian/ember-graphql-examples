import { module, test } from "qunit";
import { visit, click, currentURL } from "@ember/test-helpers";
import { setupQunit as setupPolly } from "@pollyjs/core";
import { setupApplicationTest } from "ember-qunit";

module("Acceptance | auth", function(hooks) {
  setupApplicationTest(hooks);
  setupPolly(hooks);

  test("it uses correct access token", async function(assert) {
    let { polly } = this;

    polly.server
      .post("/api/auth")
      .on("request", req => {
        assert.ok(
          req.body.includes("username=hardcodedUsername"),
          "hardcoded username included"
        );
        assert.ok(
          req.body.includes("password=hardcodedPassword"),
          "hardcoded password included"
        );
      })
      .on("response", (req, res) => {
        // assert the faux /api/auth endpoint gives us the expected
        // access and refresh tokens
        let body = JSON.parse(res.body);
        assert.equal(
          body.access_token,
          "here-is-the-access-token",
          "access_token included"
        );
        assert.equal(
          body.refresh_token,
          "here-is-the-refresh-token",
          "refresh_token included"
        );
      });

    polly.server.post("/api/graph", req =>
      assert.equal(
        req.headers.authorization,
        "Bearer here-is-the-access-token",
        "outgoing graph request has expected access token"
      )
    );

    await visit("/");
    assert.equal(currentURL(), "/login", "redirected to login route");

    await click(".login-button");
    assert.equal(currentURL(), "/", "at authenticated index route");
  });
});
