import { module, test } from "qunit";
import { visit, currentURL } from "@ember/test-helpers";
import { setupApplicationTest } from "ember-qunit";
import { authenticateSession } from "ember-simple-auth/test-support";

// https://www.apollographql.com/docs/graphql-tools/mocking.html
import setupMockResolvers from "ember-graphql-examples/tests/helpers/setup-mock-resolvers";

// so that pretender can stub fetch
import fetch from "fetch";
window.fetch = fetch;

module("Acceptance | mock resolvers", function(hooks) {
  setupApplicationTest(hooks);
  setupMockResolvers(hooks);

  test("with mock resolvers", async function(assert) {
    await authenticateSession();
    await visit("/");
    assert.equal(currentURL(), "/");

    document
      .querySelectorAll(".client-outlet .post:first-child")
      .forEach(firstPost => {
        assert.equal(
          firstPost.querySelector(".content").textContent.trim(),
          "This is a mock post coming from the mock resolvers"
        );

        assert.equal(
          firstPost.querySelector(".user-name").textContent.trim(),
          "Mock User"
        );

        assert.equal(
          firstPost.querySelector(".date").textContent.trim(),
          "on October 2, 2018"
        );
      });
  });
});
