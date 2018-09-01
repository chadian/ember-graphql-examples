import { module, test } from "qunit";
import { visit, currentURL } from "@ember/test-helpers";
import { setupApplicationTest } from "ember-qunit";
import { authenticateSession } from "ember-simple-auth/test-support";
import setupMirage from "ember-cli-mirage/test-support/setup-mirage";

// so that pretender can stub fetch
import fetch from "fetch";
window.fetch = fetch;

module("Acceptance | ember cli mirage graphql", function(hooks) {
  setupApplicationTest(hooks);
  setupMirage(hooks);

  test("visiting /", async function(assert) {
    authenticateSession();
    let user = server.create("user");
    server.create("post", { User: user });
    await visit("/");
    assert.equal(currentURL(), "/");

    document
      .querySelectorAll(".client-outlet .post:first-child")
      .forEach(firstPost => {
        assert.equal(
          firstPost.querySelector(".content").textContent.trim(),
          "This is a fantastic post coming from ember-cli-mirage"
        );

        assert.equal(
          firstPost.querySelector(".user-name").textContent.trim(),
          "Mr. Tomster"
        );

        assert.equal(
          firstPost.querySelector(".date").textContent.trim(),
          "on October 8, 2018"
        );
      });
  });
});
